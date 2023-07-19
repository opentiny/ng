/**
 * Copyright (c) 2022 - present TinyUI Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */
import { ComponentRef, Injectable, TemplateRef } from '@angular/core';
import { TiPopUpRef, TiPopupService } from '@opentiny/ng-popup';
import { TiBackdropComponent } from './TiBackdropComponent';
import { TiBackdropNoAnimationComponent } from './TiBackdropNoAnimationComponent';
import { TiModalComponent } from './TiModalComponent';
import { TiModalNoAnimationComponent } from './TiModalNoAnimationComponent';
import { TiBrowser, Util } from '@opentiny/ng-utils';
import { TiModalModule } from './TiModalModule';
import { TiModalConfig, TiModalRef } from './TiModalInterface';

/**
 * 弹框组件提供服务方式供业务使用，使用该服务时需要引入模块TiModalModule，开发者通过调用TiModalService.open方法生成弹出框
 *
 * <p><span style="color: red">使用此组件时需要开发者在项目模块(建议在根模块)
 * 中引入BrowserAnimationsModule。</span>这是因为此组件中使用了Angular动画，需要引入BrowserAnimationsModule，
 * 但是 BrowserAnimationsModule 不能在懒加载模块被重复引入，所以需要开发者来引入BrowserAnimationsModule，保证其引入一次。</p>
 *
 */
@Injectable({
  providedIn: TiModalModule
})
export class TiModalService {
  /**
   * 页面中存在的所有弹框实例，用于处理业务中无法明确当前有多少有效弹出框场景
   */
  public openedModals: Array<TiModalRef> = []; // 所有当前处于打开状态弹框缓存数组
  private backdropComponentRef: ComponentRef<TiBackdropComponent> = null; // 单个页面中多个弹框出现时,只允许存在一个遮罩层,因此使用该标志位用来缓存遮罩实例
  private defaultConfig: TiModalConfig = {
    backdrop: true,
    draggable: true,
    animation: true,
    closeOnEsc: true,
    closeIcon: true
  };
  constructor(private popService: TiPopupService<any>) {}

  /**
   * 生成弹框方法
   *
   * @param content 弹框内容，支持TemplateRef及组件形式，内容由ti-modal-header、ti-modal-body及ti-modal-footer组件构成弹框内容整体。
   *                不支持字符串形式，如果误传入字符串形式，不仅会有报错，还会存在XSS攻击风险，不过XSS攻击风险已处理。
   * @param [config] 弹框配置信息
   * @returns 弹框实例信息，使用该实例信息可调用弹框的close等方法；弹框内容为component类型时，也可通过该实例信息的content属性获取弹框内容数据
   */
  public open(content: TemplateRef<any> | any, config?: TiModalConfig): TiModalRef {
    let modalInstance: TiModalRef; // 弹框最终返回的实例对象
    let modalComponentRef: ComponentRef<TiModalComponent>; // 弹框组件实例,使用该实例获取弹框DOM元素及做属性赋值操作
    const modalConfig: TiModalConfig = { ...this.defaultConfig, ...config }; // 弹框配置合并
    let modal: {
      modalComponentRef: ComponentRef<TiModalComponent>;
      hide(): void;
    }; // generateModal方法返回值

    // 通过id唯一标识防止重复打开相同弹框,id重复情况下返回先前实例
    if (modalConfig && !Util.isUndefined(modalConfig.id)) {
      const index: number = this.openedModals.findIndex((item: TiModalRef) => {
        return item._id === modalConfig.id;
      });
      if (index !== -1) {
        return this.openedModals[index];
      }
    }
    // 根据beforeClose返回处理弹出框的销毁：业务在beforeClose中调用弹框销毁
    const destroy: (reason: boolean) => void = (reason: boolean): void => {
      if (typeof modalConfig.beforeClose === 'function') {
        modalConfig.beforeClose(modalInstance, reason);
      } else {
        destroyModal(reason);
      }
    };
    // 销毁弹框：通过调用组件的动画状态方式实现动画处理
    const destroyModal: (reason?: boolean) => void = (reason?: boolean): void => {
      if (reason) {
        if (typeof modalConfig.close === 'function') {
          modalConfig.close(modalInstance);
        }
      } else {
        if (typeof modalConfig.dismiss === 'function') {
          modalConfig.dismiss(modalInstance);
        }
      }
      modalComponentRef.instance.showState = 'hide';
    };
    // 销毁弹框实体：弹框动画执行完成后调用该方法
    const removeModalEle: () => void = (): void => {
      // 已经销毁，不做处理
      if (modalInstance === null) {
        return;
      }

      // 销毁弹框实体DOM
      modal.hide();
      // 移除缓存实例
      const index: number = this.openedModals.indexOf(modalInstance);
      this.openedModals.splice(index, 1);
      modalInstance = null;

      // 销毁backdrop
      destroyBackdrop();
    };
    const destroyBackdrop: () => void = (): void => {
      // backdrop定义为false时，不进行处理
      // backdropComponentRef 已经销毁
      if (!modalConfig.backdrop || !this.backdropComponentRef) {
        return;
      }
      // 修改backdrop zIndex，确保有多个弹出框情况下，最外层弹出框不被遮挡
      this.backdropComponentRef.instance.index = this.openedModals.length - 1;
      /**
       *  问题：两个弹出框，第一个打开的弹出框无遮罩，再此基础上打开第二个弹出框，第二个弹出框有遮罩。
       *  此时关闭第二个弹出框，关闭是有遮罩的弹出框，此处判断还有一个弹出框实例，遮罩没有关闭。
       *  关闭第一个弹出框时，因为没有设置遮罩，modalConfig.backdrop为false,关闭遮罩的逻辑就没执行，此时的现象是两个弹出框已经关闭了，但是遮罩无法关闭。
       *  解决：过滤出有遮罩的弹出框，如果还有打开的弹出框，配置了遮罩，则不关闭遮罩，
       *  如果打开的弹出框，没有配置遮罩，那就直接关闭遮罩。
       */
      // 当前还有其它弹框情况下且其他弹出框也有遮罩时,不用销毁遮罩实例
      if (this.getOpenedModalsWithBackdrop().length !== 0) {
        return;
      }
      this.backdropComponentRef.instance.showState = 'hide';
    };
    // 将当前要打开的modal放到openedModals列表中
    modalInstance = {
      _id: modalConfig && modalConfig.id,
      _backdrop: modalConfig && modalConfig.backdrop,
      close(): void {
        destroy(true);
      },
      dismiss(): void {
        destroy(false);
      },
      destroy(reason: boolean): void {
        destroyModal(reason);
      },
      _remove: removeModalEle,
      content: null
    };
    modal = this.generateModal(content, modalConfig, modalInstance);
    // 生成弹框window,并返回对应的组件实例
    modalComponentRef = modal.modalComponentRef;
    // 生成模态背景backdrop
    this.backdropComponentRef = this.generateBackdrop(modalConfig);

    return modalInstance;
  }

  // 在打开的弹出框中，获取有遮罩的弹出框集合
  private getOpenedModalsWithBackdrop(): Array<TiModalRef> {
    let backdropModal: Array<TiModalRef> = [];
    backdropModal = this.openedModals.filter((item: TiModalRef) => {
      return item._backdrop;
    });

    return backdropModal;
  }

  private generateModal(
    content: any,
    config: TiModalConfig,
    modalInstance: TiModalRef
  ): {
    modalComponentRef: ComponentRef<TiModalComponent>;
    hide(): void;
  } {
    const { context, ...modalConfig }: TiModalConfig = config;
    // tiModalComponent生成需要使用到的上下文
    const modalContext: any = {
      modalInstance,
      index: this.openedModals.length,
      ...modalConfig
    };
    // 内容部分需要使用到的上下文
    const contentContext: any = {
      close: modalInstance.close,
      dismiss: modalInstance.dismiss,
      ...context
    };
    let modalComponent: any;
    modalComponent =
      TiBrowser.isIE() && TiBrowser.version() === 9
        ? this.popService.create(TiModalNoAnimationComponent)
        : this.popService.create(TiModalComponent);
    const modalComponentRef: any = modalComponent.show({
      content,
      context: modalContext,
      contentContext,
      contentParentInjector: config.parentInjector,
      container: 'body'
    });
    // 控制元素动画呈现，元素呈现后修改动画状态才会有动画效果，因此在此处处理
    modalComponentRef.instance.showState = 'show';
    modalInstance.content = modalComponentRef.tiContentRef.componentRef;
    this.openedModals.push(modalInstance);

    return { modalComponentRef, hide: modalComponent.hide };
  }
  private generateBackdrop(config: TiModalConfig): ComponentRef<TiBackdropComponent> {
    // 配置中不需要backdrop,不生成
    if (!config.backdrop) {
      return this.backdropComponentRef;
    }

    if (this.backdropComponentRef) {
      // backdrop已存在的情况下,修改其zIndex,并确保不生成backdrop
      if (this.backdropComponentRef.instance.showState === 'show') {
        this.backdropComponentRef.instance.index = this.openedModals.length - 1;

        return this.backdropComponentRef;
        // 如果backdrop正在销毁(动画执行期间)时再新生成一个backdrop，这时应该将旧的backdrop立即销毁
      } else {
        this.backdropComponentRef.destroy();
      }
    }
    const backdropComponent: TiPopUpRef =
      TiBrowser.isIE() && TiBrowser.version() === 9
        ? this.popService.create(TiBackdropNoAnimationComponent)
        : this.popService.create(TiBackdropComponent);
    const backdropRef: ComponentRef<TiBackdropComponent> = backdropComponent.show({
      context: {
        animation: config.animation,
        destroy: (): void => {
          backdropComponent.hide();
          this.backdropComponentRef = null;
        }
      },
      container: 'body'
    });
    // 控制元素动画呈现，元素呈现后修改动画状态才会有动画效果，因此在此处处理
    backdropRef.instance.showState = 'show';

    return backdropRef;
  }
}
