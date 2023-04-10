import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './AppComponent';
import { IndexComponent } from './IndexComponent';
import { DemoModules } from './DemoModules';
import { TiLocale } from '@opentiny/ng';

@NgModule({
  imports: [
    DemoModules.allModules,
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule, // 因为modal,message,collapse,accordion组件使用了angular动画，所以需要引入此模块
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
export class AppModule {
  constructor() {
    // TiLocale.setLocale(TiLocale.EN_US); // 设置国际化语种
  }
}
