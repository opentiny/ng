import { Component } from '@angular/core';
import { TiModalRef, TiModalService, TiValidationConfig } from '@opentiny/ng';

@Component({
  templateUrl: './modal-config-test.html'
})
export class ModalConfigTestComponent {
  constructor(private tiModal: TiModalService) {}
  // 定义公共变量接收弹窗实例
  openModal: TiModalRef;
  // 弹窗外部的公共变量
  myNumber: number = 1;
  myValue: string = '';
  myValidationConfig: TiValidationConfig = {
    tip: 'should input email',
    type: 'change'
  };
  show(content: string): void {
    // 弹窗打开，会返回一个弹窗实例，使用一个公共变量去接收它，从而获得弹窗实例
    this.openModal = this.tiModal.open(content, {
      id: 'myModal', // 弹框id，设置id可防止同一页面生成多个相同弹框的问题
      animation: false, // 控制弹窗显示/隐藏是否带动画效果，不设置使用默认值，默认值为true，即表示带有动效
      draggable: false, // 控制弹窗是否可拖拽，不设置使用默认值，默认值为true，即表示可拖拽
      closeOnEsc: false, // 控制是否可通过ESC快捷键关闭弹窗，不设置使用默认值，默认值为true，即默认可通过ESC快捷键关闭弹窗
      backdrop: false, // 控制是否显示遮罩，不设置使用默认值，默认值为true，即默认展示遮罩
      closeIcon: false, // 控制头部是否有关闭按钮，不设置使用默认值，默认值为true，即默认头部有关闭按钮,
      headerAlign: 'center', // 头部内容水平对齐位置，可设置的值有'center' | 'left' | 'right'，默认值为left，表示左对齐，可参考“header自定义”示例
      modalClass: '', // 弹框样式，可通过该样式定义弹框的宽高等，可参考“modalClass功能”示例
      context: {
        // 向弹框传递的数据，当弹框内容为组件或者template时，使用方法不同。可分别参考“弹框内容为组件形式”和“弹框内容为组件形式”示例
        headerTitle: "I'm a modal!",
        // 在弹窗自定义的button，来关闭弹窗。
        closeModal: (): void => {
          this.openModal.close();
        },
        // 自定义方法，此方法来改变弹窗外部的变量this.myNumber
        changMyNumber: (): void => {
          this.myNumber++;
        }
      },
      // beforeClose可以阻止弹框的关闭，需要手动调用modalRef.destroy(reason)来关闭弹框
      beforeClose: (modalRef: TiModalRef, reason: boolean): void => {
        console.log(reason);
        // 如果不调用modalRef.destroy(reason)，无法关闭弹框
        // reason为true时，回调close()
        // reason为false时，回调dismiss()
        modalRef.destroy(reason);
      },
      close: (): void => {
        console.log('close');
      },
      dismiss: (): void => {
        console.log('dismiss');
      }
    });
  }
}
