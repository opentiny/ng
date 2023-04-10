import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './AppComponent';
import { IndexComponent } from './IndexComponent';
import { AlertTestModule } from './alert/AlertTestModule';

@NgModule({
  imports: [
    AlertTestModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        { path: '', component: IndexComponent }, // 路由地址为空
        { path: '**', component: IndexComponent } // 路由地址找不到。注意：放在数组最后
      ],
      { useHash: true } // 使用#路由
    )
  ],
  declarations: [AppComponent, IndexComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
