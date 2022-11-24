import { NgModule } from '@angular/core';
// 以下按照字母排序
import { AccordionTestModule } from './accordion/AccordionTestModule';
import { ActionmenuTestModule } from './actionmenu/ActionmenuTestModule';
import { AlertTestModule } from './alert/AlertTestModule';
import { AllcompTestModule } from './allcomp/AllcompTestModule';
import { AutocompleteTestModule } from './autocomplete/AutocompleteTestModule';
import { AnchorTestModule } from './anchor/AnchorTestModule';
import { AvatarTestModule } from './avatar/AvatarTestModule';
import { ButtonTestModule } from './button/ButtonTestModule';
import { ButtonGroupTestModule } from './buttongroup/ButtonGroupTestModule';
import { BrowserTestModule } from './browser/BrowserTestModule';
import { CascaderTestModule } from './cascader/CascaderTestModule';
import { CardTestModule } from './card/CardTestModule';
import { CheckboxTestModule } from './checkbox/CheckboxTestModule';
import { CheckgroupTestModule } from './checkgroup/CheckgroupTestModule';
import { CheckboxgroupTestModule } from './checkboxgroup/CheckboxgroupTestModule';
import { CrumbTestModule } from './crumb/CrumbTestModule';
import { DateDominatorTestModule } from './datedominator/DateDominatorTestModule';
import { DateEditTestModule } from './dateedit/DateEditTestModule';
import { DateTestModule } from './date/DateTestModule';
import { DateRangeTestModule } from './daterange/DateRangeTestModule';
import { DatetimeTestModule } from './datetime/DatetimeTestModule';
import { DatetimeRangeTestModule } from './datetimerange/DatetimeRangeTestModule';
import { DominatorTestModule } from './dominator/DominatorTestModule';
import { DragTestModule } from './drag/DragTestModule';
import { DroplistTestModule } from './droplist/DroplistTestModule';
import { DropTestModule } from './drop/DropTestModule';
import { CollapseTestModule } from './collapse/CollapseTestModule';
import { UploadTestModule } from './upload/UploadTestModule';
import { UploadimageTestModule } from './uploadimage/UploadimageTestModule';
import { FormfieldTestModule } from './formfield/FormfieldTestModule';
import { HalfmodalTestModule } from './halfmodal/HalfmodalTestModule';
import { IconTestModule } from './icon/IconTestModule';
import { ImagepreviewTestModule } from './imagepreview/ImagepreviewTestModule';
import { InputnumberTestModule } from './inputnumber/InputnumberTestModule';
import { IntroTestModule } from './intro/IntroTestModule';
import { IpTestModule } from './ip/IpTestModule';
import { IpsectionTestModule } from './ipsection/IpsectionTestModule';
import { KeymapTestModule } from './keymap/KeymapTestModule';
import { LayoutTestModule } from './layout/LayoutTestModule';
import { LeftmenuTestModule } from './leftmenu/LeftmenuTestModule';
import { LinkTestModule } from './link/LinkTestModule';
import { ListTestModule } from './list/ListTestModule';
import { LocaleTestModule } from './locale/LocaleTestModule';
import { LoadingTestModule } from './loading/LoadingTestModule';
import { LogTestModule } from './log/LogTestModule';
import { ManyTestModule } from './many/ManyTestModule';
import { MenuTestModule } from './menu/MenuTestModule';
import { MessageTestModule } from './message/MessageTestModule';
import { ModalTestModule } from './modal/ModalTestModule';
import { NavTestModule } from './nav/NavTestModule';
import { NotificationTestModule } from './notification/NotificationTestModule';
import { OverflowTestModule } from './overflow/OverflowTestModule';
import { PaginationTestModule } from './pagination/PaginationTestModule';
import { PopconfirmTestModule } from './popconfirm/PopconfirmTestModule';
import { ProgressbarTestModule } from './progressbar/ProgressbarTestModule';
import { ProgresspieTestModule } from './progresspie/ProgresspieTestModule';
import { RadioTestModule } from './radio/RadioTestModule';
import { RadioGroupTestModule } from './radiogroup/RadioGroupTestModule';
import { RateTestModule } from './rate/RateTestModule';
import { SearchboxTestModule } from './searchbox/SearchboxTestModule';
import { SelectTestModule } from './select/SelectTestModule';
import { SkeletonTestModule } from './skeleton/SkeletonTestModule';
import { SliderTestModule } from './slider/SliderTestModule';
import { SpinnerTestModule } from './spinner/SpinnerTestModule';
import { StepsTestModule } from './steps/StepsTestModule';
import { SubtitleTestModule } from './subtitle/SubtitleTestModule';
import { SwitchTestModule } from './switch/SwitchTestModule';
import { SwiperTestModule } from './swiper/SwiperTestModule';
import { TabTestModule } from './tab/TabTestModule';
import { TableTestModule } from './table/TableTestModule';
import { TagsInputTestModule } from './tagsinput/TagsInputTestModule';
import { TagTestModule } from './tag/TagTestModule';
import { TextTestModule } from './text/TextTestModule';
import { TextareaTestModule } from './textarea/TextareaTestModule';
import { ThemeTestModule } from './theme/ThemeTestModule';
import { TimeTestModule } from './time/TimeTestModule';
import { TimelineTestModule } from './timeline/TimelineTestModule';
import { TipTestModule } from './tip/TipTestModule';
import { TransferTestModule } from './transfer/TransferTestModule';
import { TreeTestModule } from './tree/TreeTestModule';
import { TreeselectTestModule } from './treeselect/TreeselectTestModule';
import { UtilsTestModule } from './utils/UtilsTestModule';
import { ValidationTestModule } from './validation/ValidationTestModule';
import { VarsTestModule } from './vars/VarsTestModule';
import { ZoomTestModule } from './zoom/ZoomTestModule';
// 以上按照字母排序，禁止在末尾添加

@NgModule({
    imports: DemoModules.allModules,
    exports: DemoModules.allModules,
    declarations: []
  })
export class DemoModules {
    // 增加新的测试模块，需配置此数组。
    static allModules: Array<any> = [
        // 以下按照字母排序
        AccordionTestModule,
        ActionmenuTestModule,
        AlertTestModule,
        AllcompTestModule,
        AnchorTestModule,
        AvatarTestModule,
        AutocompleteTestModule,
        ButtonTestModule,
        ButtonGroupTestModule,
        BrowserTestModule,
        CascaderTestModule,
        CardTestModule,
        CheckboxTestModule,
        CheckgroupTestModule,
        CheckboxgroupTestModule,
        CollapseTestModule,
        CrumbTestModule,
        DateTestModule,
        DateDominatorTestModule,
        DateEditTestModule,
        DateRangeTestModule,
        DatetimeTestModule,
        DatetimeRangeTestModule,
        DominatorTestModule,
        DragTestModule,
        DroplistTestModule,
        DropTestModule,
        UploadTestModule,
        UploadimageTestModule,
        FormfieldTestModule,
        HalfmodalTestModule,
        IconTestModule,
        ImagepreviewTestModule,
        InputnumberTestModule,
        IntroTestModule,
        IpTestModule,
        IpsectionTestModule,
        KeymapTestModule,
        LayoutTestModule,
        LeftmenuTestModule,
        LinkTestModule,
        ListTestModule,
        LoadingTestModule,
        LocaleTestModule,
        LogTestModule,
        ManyTestModule,
        MenuTestModule,
        MessageTestModule,
        ModalTestModule,
        NavTestModule,
        NotificationTestModule,
        OverflowTestModule,
        PaginationTestModule,
        PopconfirmTestModule,
        ProgressbarTestModule,
        ProgresspieTestModule,
        RadioTestModule,
        RadioGroupTestModule,
        RateTestModule,
        SearchboxTestModule,
        SelectTestModule,
        SkeletonTestModule,
        SliderTestModule,
        SpinnerTestModule,
        StepsTestModule,
        SubtitleTestModule,
        SwitchTestModule,
        SwiperTestModule,
        TabTestModule,
        TableTestModule,
        TagTestModule,
        TagsInputTestModule,
        TextTestModule,
        TextareaTestModule,
        ThemeTestModule,
        TimeTestModule,
        TimelineTestModule,
        TipTestModule,
        TransferTestModule,
        TreeTestModule,
        TreeselectTestModule,
        UtilsTestModule,
        ValidationTestModule,
        VarsTestModule,
        ZoomTestModule
        // 以上按照字母排序，禁止在末尾添加
    ];
}
