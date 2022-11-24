import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TiAccordionModule, TiButtongroupModule, TiButtonModule, TiFormfieldModule,
    TiHalfmodalModule, TiIconModule, TiMessageModule, TiModalModule, TiOverflowModule,
    TiRadioModule, TiSearchboxModule, TiSelectModule, TiStepsModule, TiTableModule,
    TiTabModule, TiTextareaModule, TiTextModule, TiTipModule } from '@opentiny/ng';

import { DemoLogModule } from '../demolog/DemoLogModule';
import { HalfmodalBasicComponent } from './HalfmodalBasicComponent';
import { HalfmodalMultiComponent } from './HalfmodalMultiComponent';
import { HalfmodalBackdropComponent } from './HalfmodalBackdropComponent';
import { HalfmodalBeforehideComponent } from './HalfmodalBeforehideComponent';
import { HalfmodalModalselectComponent } from './HalfmodalModalselectComponent';
import { HalfmodalContentComponent } from './HalfmodalContentComponent';
import { HalfmodalModalComponent } from './HalfmodalModalComponent';
import { HalfmodalAsyncComponent } from './HalfmodalAsyncComponent';
import { ContentComponent, HalfmodalServiceComponent } from './HalfmodalServiceComponent';
import { HalfmodalServiceTestComponent } from './HalfmodalServiceTestComponent';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TiAccordionModule,
        TiButtonModule,
        TiButtongroupModule,
        TiMessageModule,
        TiSearchboxModule,
        TiSelectModule,
        TiTabModule,
        TiTipModule,
        TiFormfieldModule,
        TiModalModule,
        TiRadioModule,
        TiTableModule,
        TiTextModule,
        TiOverflowModule,
        TiTextareaModule,
        TiStepsModule,
        TiIconModule,
        TiHalfmodalModule,
        DemoLogModule,
        RouterModule.forChild(HalfmodalTestModule.ROUTES)
    ],
    declarations: [HalfmodalBasicComponent, HalfmodalMultiComponent, HalfmodalBackdropComponent, HalfmodalServiceComponent,
        HalfmodalModalComponent, HalfmodalBeforehideComponent, HalfmodalContentComponent,
        HalfmodalModalselectComponent, ContentComponent, HalfmodalAsyncComponent, HalfmodalServiceTestComponent],
    entryComponents: [ContentComponent]
})

export class HalfmodalTestModule {
    public static readonly ROUTES: Routes = [
        { path: 'halfmodal/halfmodal-basic', component: HalfmodalBasicComponent },
        { path: 'halfmodal/halfmodal-backdrop', component: HalfmodalBackdropComponent },
        { path: 'halfmodal/halfmodal-beforehide', component: HalfmodalBeforehideComponent },
        { path: 'halfmodal/halfmodal-content', component: HalfmodalContentComponent },
        { path: 'halfmodal/halfmodal-service', component: HalfmodalServiceComponent },
        { path: 'halfmodal/halfmodal-service-test', component: HalfmodalServiceTestComponent },
        { path: 'halfmodal/halfmodal-modal', component: HalfmodalModalComponent },
        { path: 'halfmodal/halfmodal-multi', component: HalfmodalMultiComponent },
        { path: 'halfmodal/halfmodal-modalselect', component: HalfmodalModalselectComponent },
        { path: 'halfmodal/halfmodal-async', component: HalfmodalAsyncComponent }
    ];
}
