import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TiProductpreviewModule } from '@opentiny/ng';

import { ProductpreviewBasicComponent } from './ProductpreviewBasicComponent';

@NgModule({
  imports: [CommonModule, TiProductpreviewModule, RouterModule.forChild(ProductpreviewTestModule.ROUTES)],
  declarations: [ProductpreviewBasicComponent]
})
export class ProductpreviewTestModule {
  public static readonly ROUTES: Routes = [{ path: 'productpreview/productpreview-basic', component: ProductpreviewBasicComponent }];
}
