import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TiAvatarModule} from '@opentiny/ng';

import { AvatarSizeComponent } from './AvatarSizeComponent';
import { AvatarShapeComponent } from './AvatarShapeComponent';
import { AvatarTextComponent } from './AvatarTextComponent';
import { AvatarImageComponent } from './AvatarImageComponent';
import { AvatarStyleComponent } from './AvatarStyleComponent';
import { AvatarImageErrorTestComponent } from './AvatarImageErrorTestComponent';


@NgModule({
  imports: [
    CommonModule,
    TiAvatarModule,
    RouterModule.forChild(AvatarTestModule.ROUTES)
  ],
  declarations: [
    AvatarSizeComponent,
    AvatarShapeComponent,
    AvatarTextComponent,
    AvatarStyleComponent,
    AvatarImageComponent,
    AvatarImageErrorTestComponent
  ]
})
export class AvatarTestModule {
  public static OWNER: string = '李麟玄lilinxuan00650216';
  public static readonly LINKS: Array<object> = [
    { href: 'components/TiAvatarComponent.html', label: 'Avatar' }
  ];
  public static readonly ROUTES: Routes = [
    { path: 'avatar/avatar-size',
    component: AvatarSizeComponent,
    data: { label: '尺寸' }
    },
    { path: 'avatar/avatar-shape',
    component: AvatarShapeComponent,
    data: { label: '形状' }
    },
    { path: 'avatar/avatar-text',
      component: AvatarTextComponent,
      data: { label: '文本头像' }
    },
    { path: 'avatar/avatar-image',
    component: AvatarImageComponent,
    data: { label: '图像头像' }
    },
    { path: 'avatar/avatar-style',
      component: AvatarStyleComponent,
      data: { label: '样式' }
    },
    { path: 'avatar/avatar-image-error-test',
    component: AvatarImageErrorTestComponent,
    data: { label: '图像加载失败' }
  },
  ];
}
