import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { DemoModules } from './DemoModules';

import { AccordionBasicComponent } from './accordion/AccordionBasicComponent';

import { AccordionClassComponent } from './accordion/AccordionClassComponent';

import { AccordionClickToggleComponent } from './accordion/AccordionClickToggleComponent';

import { AccordionCloseOthersComponent } from './accordion/AccordionCloseOthersComponent';

import { AccordionDisabledComponent } from './accordion/AccordionDisabledComponent';

import { AccordionOpenComponent } from './accordion/AccordionOpenComponent';

import { ActionmenuDataComponent } from './actionmenu/ActionmenuDataComponent';

import { ActionmenuData2Component } from './actionmenu/ActionmenuData2Component';

import { ActionmenuBasicComponent } from './actionmenu/ActionmenuBasicComponent';

import { ActionmenuDividerComponent } from './actionmenu/ActionmenuDividerComponent';

import { ActionmenuEventComponent } from './actionmenu/ActionmenuEventComponent';

import { ActionmenuFocusComponent } from './actionmenu/ActionmenuFocusComponent';

import { ActionmenuIdComponent } from './actionmenu/ActionmenuIdComponent';

import { ActionmenuItemsChangeComponent } from './actionmenu/ActionmenuItemsChangeComponent';

import { ActionmenuItemsComponent } from './actionmenu/ActionmenuItemsComponent';

import { ActionmenuManyComponent } from './actionmenu/ActionmenuManyComponent';

import { ActionmenuTableComponent } from './actionmenu/ActionmenuTableComponent';

import { ActionmenuTipsComponent } from './actionmenu/ActionmenuTipsComponent';

import { ActionmenuLabelkeyComponent } from './actionmenu/ActionmenuLabelkeyComponent';

import { ActionmenuDisabledComponent } from './actionmenu/ActionmenuDisabledComponent';

import { ActionmenuSpaceComponent } from './actionmenu/ActionmenuSpaceComponent';

import { ActionmenuMenutextComponent } from './actionmenu/ActionmenuMenutextComponent';

import { ActionmenuPanelstyleComponent } from './actionmenu/ActionmenuPanelstyleComponent';

import { ActionmenuTempleteComponent } from './actionmenu/ActionmenuTempleteComponent';

import { ActionmenuShownumComponent } from './actionmenu/ActionmenuShownumComponent';

import { AlertBoxshadowComponent } from './alert/AlertBoxshadowComponent';

import { AlertDarkthemeComponent } from './alert/AlertDarkthemeComponent';

import { AlertDismissComponent } from './alert/AlertDismissComponent';

import { AlertEventComponent } from './alert/AlertEventComponent';

import { AlertIconComponent } from './alert/AlertIconComponent';

import { AlertMessagesComponent } from './alert/AlertMessagesComponent';

import { AlertOpenTestComponent } from './alert/AlertOpenTestComponent';

import { AlertOpenComponent } from './alert/AlertOpenComponent';

import { AlertSizeComponent } from './alert/AlertSizeComponent';

import { AlertTriggerScrollComponent } from './alert/AlertTriggerScrollComponent';

import { AlertTypeComponent } from './alert/AlertTypeComponent';

import { AnchorBasicComponent } from './anchor/AnchorBasicComponent';

import { AnchorEventsComponent } from './anchor/AnchorEventsComponent';

import { AnchorIdComponent } from './anchor/AnchorIdComponent';

import { AnchorOffsettopComponent } from './anchor/AnchorOffsettopComponent';

import { AnchorSpeedComponent } from './anchor/AnchorSpeedComponent';

import { AnchorTemplateComponent } from './anchor/AnchorTemplateComponent';

import { AnchorScrolltargetComponent } from './anchor/AnchorScrolltargetComponent';

import { AutocompleteAppendtobodyComponent } from './autocomplete/AutocompleteAppendtobodyComponent';

import { AutocompleteBasicComponent } from './autocomplete/AutocompleteBasicComponent';

import { AutocompleteClearableComponent } from './autocomplete/AutocompleteClearableComponent';

import { AutocompleteDisabledComponent } from './autocomplete/AutocompleteDisabledComponent';

import { AutocompleteEventsComponent } from './autocomplete/AutocompleteEventsComponent';

import { AutocompleteLabelkeyComponent } from './autocomplete/AutocompleteLabelkeyComponent';

import { AutocompleteMaxlengthComponent } from './autocomplete/AutocompleteMaxlengthComponent';

import { AutocompletePanelSizeComponent } from './autocomplete/AutocompletePanelSizeComponent';

import { AutocompleteTestComponent } from './autocomplete/AutocompleteTestComponent';

import { AutocompleteTipComponent } from './autocomplete/AutocompleteTipComponent';

import { AutocompleteValidComponent } from './autocomplete/AutocompleteValidComponent';

import { AutocompleteTemplateComponent } from './autocomplete/AutocompleteTemplateComponent';

import { AvatarSizeComponent } from './avatar/AvatarSizeComponent';

import { AvatarShapeComponent } from './avatar/AvatarShapeComponent';

import { AvatarTextComponent  } from './avatar/AvatarTextComponent';

import { AvatarImageComponent  } from './avatar/AvatarImageComponent';

import { AvatarStyleComponent } from './avatar/AvatarStyleComponent';

import { AvatarImageErrorTestComponent } from './avatar/AvatarImageErrorTestComponent';

import { ButtonColorComponent } from './button/ButtonColorComponent';

import { ButtonDisabledComponent } from './button/ButtonDisabledComponent';

import { ButtonEventComponent } from './button/ButtonEventComponent';

import { ButtonFocusComponent } from './button/ButtonFocusComponent';

import { ButtonHasborderTestComponent } from './button/ButtonHasborderTestComponent';

import { ButtonHasborderComponent } from './button/ButtonHasborderComponent';

import { ButtonIconComponent } from './button/ButtonIconComponent';

import { ButtonLoadingComponent } from './button/ButtonLoadingComponent';

import { ButtonOnlyiconComponent } from './button/ButtonOnlyiconComponent';

import { ButtonSizeComponent } from './button/ButtonSizeComponent';

import { ButtonTipComponent } from './button/ButtonTipComponent';

import { ButtongroupItemsComponent } from './buttongroup/ButtongroupItemsComponent';

import { ButtongroupActiveclassComponent } from './buttongroup/ButtongroupActiveclassComponent';

import { ButtongroupBeforeclickComponent } from './buttongroup/ButtongroupBeforeclickComponent';

import { ButtongroupTemplateComponent } from './buttongroup/ButtongroupTemplateComponent';

import { ButtongroupDeselectableComponent } from './buttongroup/ButtongroupDeselectableComponent';

import { ButtongroupDisabledComponent } from './buttongroup/ButtongroupDisabledComponent';

import { ButtongroupEnumComponent } from './buttongroup/ButtongroupEnumComponent';

import { ButtongroupEventComponent } from './buttongroup/ButtongroupEventComponent';

import { ButtongroupFocusComponent } from './buttongroup/ButtongroupFocusComponent';

import { ButtongroupIdTestComponent } from './buttongroup/ButtongroupIdTestComponent';

import { ButtongroupIdComponent } from './buttongroup/ButtongroupIdComponent';

import { ButtongroupItemsTestComponent } from './buttongroup/ButtongroupItemsTestComponent';

import { ButtongroupManyComponent } from './buttongroup/ButtongroupManyComponent';

import { ButtongroupMinwidthComponent } from './buttongroup/ButtongroupMinwidthComponent';

import { ButtongroupMultiTypeComponent } from './buttongroup/ButtongroupMultiTypeComponent';

import { ButtongroupMultilineComponent } from './buttongroup/ButtongroupMultilineComponent';

import { ButtongroupMultipleComponent } from './buttongroup/ButtongroupMultipleComponent';

import { ButtongroupRadioTypeComponent } from './buttongroup/ButtongroupRadioTypeComponent';

import { ButtongroupReactiveFormsComponent } from './buttongroup/ButtongroupReactiveFormsComponent';

import { ButtongroupSupTestComponent } from './buttongroup/ButtongroupSupTestComponent';

import { ButtongroupSupComponent } from './buttongroup/ButtongroupSupComponent';

import { ButtongroupTipComponent } from './buttongroup/ButtongroupTipComponent';

import { ButtongroupValuekeyTestComponent } from './buttongroup/ButtongroupValuekeyTestComponent';

import { ButtongroupValuekeyComponent } from './buttongroup/ButtongroupValuekeyComponent';

import { BrowserUsageComponent } from './browser/BrowserUsageComponent';

import { CardBasicComponent } from './card/CardBasicComponent';

import { CardAddComponent } from './card/CardAddComponent';

import { CardHeaderComponent } from './card/CardHeaderComponent';

import { CardGrid2Component } from './card/CardGrid2Component';

import { CardGridComponent } from './card/CardGridComponent';

import { CascaderBasicComponent } from './cascader/CascaderBasicComponent';

import { CascaderDisabledComponent } from './cascader/CascaderDisabledComponent';

import { CascaderPanelComponent } from './cascader/CascaderPanelComponent';

import { CascaderTriggerComponent } from './cascader/CascaderTriggerComponent';

import { CascaderShowalllevelComponent } from './cascader/CascaderShowalllevelComponent';

import { CascaderOnlyselectleafComponent } from './cascader/CascaderOnlyselectleafComponent';

import { CascaderEventsComponent } from './cascader/CascaderEventsComponent';

import { CascaderLabelkeyComponent } from './cascader/CascaderLabelkeyComponent';

import { CascaderValuekeyComponent } from './cascader/CascaderValuekeyComponent';

import { CascaderIdkeyComponent } from './cascader/CascaderIdkeyComponent';

import { CascaderSearchComponent } from './cascader/CascaderSearchComponent';

import { CheckboxDefaultComponent } from './checkbox/CheckboxDefaultComponent';

import { CheckboxDisabledComponent } from './checkbox/CheckboxDisabledComponent';

import { CheckboxEventComponent } from './checkbox/CheckboxEventComponent';

import { CheckboxFocusedComponent } from './checkbox/CheckboxFocusedComponent';

import { CheckboxIndeterminateComponent } from './checkbox/CheckboxIndeterminateComponent';

import { CheckboxLabelComponent } from './checkbox/CheckboxLabelComponent';

import { CheckgroupBasicComponent } from './checkgroup/CheckgroupBasicComponent';

import { CheckgroupChangeComponent } from './checkgroup/CheckgroupChangeComponent';

import { CheckgroupCrossComponent } from './checkgroup/CheckgroupCrossComponent';

import { CheckgroupDefaultComponent } from './checkgroup/CheckgroupDefaultComponent';

import { CheckgroupDisabledComponent } from './checkgroup/CheckgroupDisabledComponent';

import { CheckgroupItemComponent } from './checkgroup/CheckgroupItemComponent';

import { CheckgroupLevelComponent } from './checkgroup/CheckgroupLevelComponent';

import { CheckgroupRefreshComponent } from './checkgroup/CheckgroupRefreshComponent';

import { CheckgroupScenesComponent } from './checkgroup/CheckgroupScenesComponent';

import { CheckgroupTreeComponent } from './checkgroup/CheckgroupTreeComponent';

import { CheckgroupValuekeyComponent } from './checkgroup/CheckgroupValuekeyComponent';

import { CheckboxgroupBasicComponent } from './checkboxgroup/CheckboxgroupBasicComponent';

import { CheckboxgroupDirectionComponent } from './checkboxgroup/CheckboxgroupDirectionComponent';

import { CheckboxgroupLinewrapComponent } from './checkboxgroup/CheckboxgroupLinewrapComponent';

import { CheckboxgroupTemplateComponent } from './checkboxgroup/CheckboxgroupTemplateComponent';

import { CheckboxgroupLabelkeyComponent } from './checkboxgroup/CheckboxgroupLabelkeyComponent';

import { CheckboxgroupValuekeyComponent } from './checkboxgroup/CheckboxgroupValuekeyComponent';

import { CollapseBasicComponent } from './collapse/CollapseBasicComponent';

import { CollapseEventComponent } from './collapse/CollapseEventComponent';

import { CrumbBasicComponent } from './crumb/CrumbBasicComponent';

import { CrumbHrefComponent } from './crumb/CrumbHrefComponent';

import { CrumbRouterComponent } from './crumb/CrumbRouterComponent';

import { CrumbEventsComponent } from './crumb/CrumbEventsComponent';

import { DateCustomizeComponent } from './date/DateCustomizeComponent';

import { DateDisabledComponent } from './date/DateDisabledComponent';

import { DateDisableddaysComponent } from './date/DateDisableddaysComponent';

import { DateEventComponent } from './date/DateEventComponent';

import { DateFormComponent } from './date/DateFormComponent';

import { DateFormatComponent } from './date/DateFormatComponent';

import { DateMaxComponent } from './date/DateMaxComponent';

import { DateMaxminComponent } from './date/DateMaxminComponent';

import { DateMinComponent } from './date/DateMinComponent';

import { DateNowdatetimeComponent } from './date/DateNowdatetimeComponent';

import { DatePanelalignComponent } from './date/DatePanelalignComponent';

import { DateValidationComponent } from './date/DateValidationComponent';

import { DateValueComponent } from './date/DateValueComponent';

import { DateCleariconComponent } from './date/DateCleariconComponent';

import { DaterangeCustomizeComponent } from './daterange/DaterangeCustomizeComponent';

import { DaterangeDisabledComponent } from './daterange/DaterangeDisabledComponent';

import { DaterangeDisableddaysComponent } from './daterange/DaterangeDisableddaysComponent';

import { DaterangeEventComponent } from './daterange/DaterangeEventComponent';

import { DaterangeFixedvalueComponent } from './daterange/DaterangeFixedvalueComponent';

import { DaterangeFormatComponent } from './daterange/DaterangeFormatComponent';

import { DaterangeIsallowbeginequalendComponent } from './daterange/DaterangeIsallowbeginequalendComponent';

import { DaterangeMaxComponent } from './daterange/DaterangeMaxComponent';

import { DaterangeMaxminComponent } from './daterange/DaterangeMaxminComponent';

import { DaterangeMinComponent } from './daterange/DaterangeMinComponent';

import { DaterangeNowdatetimeComponent } from './daterange/DaterangeNowdatetimeComponent';

import { DaterangePanelalignComponent } from './daterange/DaterangePanelalignComponent';

import { DaterangeValidationComponent } from './daterange/DaterangeValidationComponent';

import { DaterangeValueComponent } from './daterange/DaterangeValueComponent';

import { DatetimeCustomizeComponent } from './datetime/DatetimeCustomizeComponent';

import { DatetimeDisabledComponent } from './datetime/DatetimeDisabledComponent';

import { DatetimeEventComponent } from './datetime/DatetimeEventComponent';

import { DatetimeFormatComponent } from './datetime/DatetimeFormatComponent';

import { DatetimeMaxComponent } from './datetime/DatetimeMaxComponent';

import { DatetimeMinComponent } from './datetime/DatetimeMinComponent';

import { DatetimeNowdatetimeComponent } from './datetime/DatetimeNowdatetimeComponent';

import { DatetimeValidationComponent } from './datetime/DatetimeValidationComponent';

import { DatetimeValueComponent } from './datetime/DatetimeValueComponent';

import { DatetimeMaxminComponent } from './datetime/DatetimeMaxminComponent';

import { DatetimePanelalignComponent } from './datetime/DatetimePanelalignComponent';

import { DatetimeCleariconComponent } from './datetime/DatetimeCleariconComponent';

import { DatetimerangeCustomizeComponent } from './datetimerange/DatetimerangeCustomizeComponent';

import { DatetimerangeDisabledComponent } from './datetimerange/DatetimerangeDisabledComponent';

import { DatetimerangeEventComponent } from './datetimerange/DatetimerangeEventComponent';

import { DatetimerangeFormatComponent } from './datetimerange/DatetimerangeFormatComponent';

import { DatetimerangeIsallowbeginequalendComponent } from './datetimerange/DatetimerangeIsallowbeginequalendComponent';

import { DatetimerangeManyTestComponent } from './datetimerange/DatetimerangeManyTestComponent';

import { DatetimerangeMaxComponent } from './datetimerange/DatetimerangeMaxComponent';

import { DatetimerangeMinComponent } from './datetimerange/DatetimerangeMinComponent';

import { DatetimerangeNowdatetimeComponent } from './datetimerange/DatetimerangeNowdatetimeComponent';

import { DatetimerangeTimezoneableComponent } from './datetimerange/DatetimerangeTimezoneableComponent';

import { DatetimerangeValidationComponent } from './datetimerange/DatetimerangeValidationComponent';

import { DatetimerangeValueComponent } from './datetimerange/DatetimerangeValueComponent';

import { DatetimerangeMaxminComponent } from './datetimerange/DatetimerangeMaxminComponent';

import { DatetimerangePanelalignComponent } from './datetimerange/DatetimerangePanelalignComponent';

import { DatetimerangeCleariconComponent } from './datetimerange/DatetimerangeCleariconComponent';

import { FormfieldColspanRowspanComponent } from './formfield/FormfieldColspanRowspanComponent';

import { FormfieldColswidthComponent } from './formfield/FormfieldColswidthComponent';

import { FormfieldFooComponent } from './formfield/FormfieldFooComponent';

import { FormfieldIndexComponent } from './formfield/FormfieldIndexComponent';

import { FormfieldLabelComponent } from './formfield/FormfieldLabelComponent';

import { FormfieldLabelwidthComponent } from './formfield/FormfieldLabelwidthComponent';

import { FormfieldMultiColumnComponent } from './formfield/FormfieldMultiColumnComponent';

import { FormfieldNestFormfiledComponent } from './formfield/FormfieldNestFormfiledComponent';

import { FormfieldNgforTestComponent } from './formfield/FormfieldNgforTestComponent';

import { FormfieldRequiredComponent } from './formfield/FormfieldRequiredComponent';

import { FormfieldShowComponent } from './formfield/FormfieldShowComponent';

import { FormfieldSingleColumnComponent } from './formfield/FormfieldSingleColumnComponent';

import { FormfieldTestComponent } from './formfield/FormfieldTestComponent';

import { FormfieldTextFormComponent } from './formfield/FormfieldTextFormComponent';

import { FormfieldVerticalComponent } from './formfield/FormfieldVerticalComponent';

import { FormfieldVerticalAlignComponent } from './formfield/FormfieldVerticalAlignComponent';

import { HalfmodalBasicComponent } from './halfmodal/HalfmodalBasicComponent';

import { HalfmodalBackdropComponent } from './halfmodal/HalfmodalBackdropComponent';

import { HalfmodalBeforehideComponent } from './halfmodal/HalfmodalBeforehideComponent';

import { HalfmodalContentComponent } from './halfmodal/HalfmodalContentComponent';

import { HalfmodalServiceComponent } from './halfmodal/HalfmodalServiceComponent';

import { IconBasicComponent } from './icon/IconBasicComponent';

import { IconShowComponent } from './icon/IconShowComponent';

import { IconSetpathComponent } from './icon/IconSetpathComponent';

import { ImagepreviewBasicComponent } from './imagepreview/ImagepreviewBasicComponent';

import { InputnumberBasicComponent } from './inputnumber/InputnumberBasicComponent';

import { InputnumberEventComponent } from './inputnumber/InputnumberEventComponent';

import { InputnumberFocusComponent } from './inputnumber/InputnumberFocusComponent';

import { InputnumberFormatComponent } from './inputnumber/InputnumberFormatComponent';

import { InputnumberLoadComponent } from './inputnumber/InputnumberLoadComponent';

import { InputnumberLocaleableComponent } from './inputnumber/InputnumberLocaleableComponent';

import { InputnumberMaxlengthComponent } from './inputnumber/InputnumberMaxlengthComponent';

import { IntroBasicComponent } from './intro/IntroBasicComponent';

import { IntroEventComponent } from './intro/IntroEventComponent';

import { IntroModalComponent } from './intro/IntroModalComponent';

import { IntroSkipableComponent } from './intro/IntroSkipableComponent';

import { IntroTemplateComponent } from './intro/IntroTemplateComponent';

import { IntroTipComponent } from './intro/IntroTipComponent';

import { IntroTiscrollComponent } from './intro/IntroTiscrollComponent';

import { IpBasicComponent } from './ip/IpBasicComponent';

import { IpDisabledComponent } from './ip/IpDisabledComponent';

import { IpFormcontrolComponent } from './ip/IpFormcontrolComponent';

import { IpValidComponent } from './ip/IpValidComponent';

import { IpsectionBasicComponent } from './ipsection/IpsectionBasicComponent';

import { IpsectionDisabledComponent } from './ipsection/IpsectionDisabledComponent';

import { IpsectionEventsComponent } from './ipsection/IpsectionEventsComponent';

import { IpsectionFocusComponent } from './ipsection/IpsectionFocusComponent';

import { IpsectionTestComponent } from './ipsection/IpsectionTestComponent';

import { IpsectionValidFormgroupComponent } from './ipsection/IpsectionValidFormgroupComponent';

import { IpsectionValidComponent } from './ipsection/IpsectionValidComponent';

import { KeymapUsageComponent } from './keymap/KeymapUsageComponent';

import { LayoutBasicComponent } from './layout/LayoutBasicComponent';

import { LayoutBasicSimpleComponent } from './layout/LayoutBasicSimpleComponent';

import { LayoutBasicSimpleResponsiveComponent } from './layout/LayoutBasicSimpleResponsiveComponent';

import { LayoutOverviewComponent } from './layout/LayoutOverviewComponent';

import { LayoutSingleComponent } from './layout/LayoutSingleComponent';

import { LayoutMultiColumnComponent } from './layout/LayoutMultiColumnComponent';

import { LeftmenuNoRouterWebsiteViewComponent } from './leftmenu/website-views/LeftmenuNoRouterWebsiteViewComponent';

import { LeftmenuBasicWebsiteViewComponent } from './leftmenu/website-views/LeftmenuBasicWebsiteViewComponent';

import { LeftmenuParamsWebsiteViewComponent } from './leftmenu/website-views/LeftmenuParamsWebsiteViewComponent';

import { LeftmenuRouterlistWebsiteViewComponent } from './leftmenu/website-views/LeftmenuRouterlistWebsiteViewComponent';

import { LeftmenuHrefWebsiteViewComponent } from './leftmenu/website-views/LeftmenuHrefWebsiteViewComponent';

import { LeftmenuGroupWebsiteViewComponent } from './leftmenu/website-views/LeftmenuGroupWebsiteViewComponent';

import { LeftmenuFootWebsiteViewComponent } from './leftmenu/website-views/LeftmenuFootWebsiteViewComponent';

import { LeftmenuDividingWebsiteViewComponent } from './leftmenu/website-views/LeftmenuDividingWebsiteViewComponent';

import { LeftmenuReloadStateWebsiteViewComponent } from './leftmenu/website-views/LeftmenuReloadStateWebsiteViewComponent';

import { LeftmenuCollapsedWebsiteViewComponent } from './leftmenu/website-views/LeftmenuCollapsedWebsiteViewComponent';

import { LeftmenuToggleableWebsiteViewComponent } from './leftmenu/website-views/LeftmenuToggleableWebsiteViewComponent';

import { LeftmenuDisabledWebsiteViewComponent } from './leftmenu/website-views/LeftmenuDisabledWebsiteViewComponent';

import { LeftmenuActiveChangeWebsiteViewComponent } from './leftmenu/website-views/LeftmenuActiveChangeWebsiteViewComponent';

import { LeftmenuScrollComponent } from './leftmenu/LeftmenuScrollComponent';

import { LeftmenuSecurityComponent } from './leftmenu/LeftmenuSecurityComponent';

import { LinkNavigationComponent } from './link/LinkNavigationComponent';

import { LinkRichtextComponent } from './link/LinkRichtextComponent';

import { LoadingBasicComponent } from './loading/LoadingBasicComponent';

import { LoadingSizeComponent } from './loading/LoadingSizeComponent';

import { LoadingTypeComponent } from './loading/LoadingTypeComponent';

import { LocaleBasicComponent } from './locale/LocaleBasicComponent';

import { LocaleFormatComponent } from './locale/LocaleFormatComponent';

import { LocaleReloadComponent } from './locale/LocaleReloadComponent';

import { LogUsageComponent } from './log/LogUsageComponent';

import { MenuBeforeopenComponent } from './menu/MenuBeforeopenComponent';

import { MenuBorderComponent } from './menu/MenuBorderComponent';

import { MenuBasicComponent } from './menu/MenuBasicComponent';

import { MenuDisabledComponent } from './menu/MenuDisabledComponent';

import { MenuGroupComponent } from './menu/MenuGroupComponent';

import { MenuIdComponent } from './menu/MenuIdComponent';

import { MenuPanelalignComponent } from './menu/MenuPanelalignComponent';

import { MenuPanelstyleComponent } from './menu/MenuPanelstyleComponent';

import { MenuTipsComponent } from './menu/MenuTipsComponent';

import { MenuLabelkeyComponent } from './menu/MenuLabelkeyComponent';

import { MenuTempleteComponent } from './menu/MenuTempleteComponent';

import { MenuEventComponent } from './menu/MenuEventComponent';

import { MenuButtoncolorComponent } from './menu/MenuButtoncolorComponent';

import { MessageBasicComponent } from './message/MessageBasicComponent';

import { MessageBtnComponent } from './message/MessageBtnComponent';

import { MessageBtnTestComponent } from './message/MessageBtnTestComponent';

import { MessageContentComponent } from './message/MessageContentComponent';

import { MessageIdComponent } from './message/MessageIdComponent';

import { MessageSecurityComponent } from './message/MessageSecurityComponent';

import { MessageTitleComponent } from './message/MessageTitleComponent';

import { MessageTypeComponent } from './message/MessageTypeComponent';

import { ModalClassComponent } from './modal/ModalClassComponent';

import { ModalConfigTestComponent } from './modal/ModalConfigTestComponent';

import { ModalContentCompComponent } from './modal/ModalContentCompComponent';

import { ModalContentTempComponent } from './modal/ModalContentTempComponent';

import { ModalEventComponent } from './modal/ModalEventComponent';

import { ModalHeaderStyleComponent } from './modal/ModalHeaderStyleComponent';

import { ModalTwoBackdropComponent } from './modal/ModalTwoBackdropComponent';

import { ModalTwoTestComponent } from './modal/ModalTwoTestComponent';

import { ModalAnimationComponent } from './modal/ModalAnimationComponent';

import { ModalBackdropComponent } from './modal/ModalBackdropComponent';

import { ModalCloseIconComponent } from './modal/ModalCloseIconComponent';

import { ModalDraggableComponent } from './modal/ModalDraggableComponent';

import { ModalHeaderAlignComponent } from './modal/ModalHeaderAlignComponent';

import { ModalEscComponent } from './modal/ModalEscComponent';

import { NavActiveComponent } from './nav/NavActiveComponent';

import { NavAlignComponent } from './nav/NavAlignComponent';

import { NavBasicComponent } from './nav/NavBasicComponent';

import { NavDisabledComponent } from './nav/NavDisabledComponent';

import { NavEventComponent } from './nav/NavEventComponent';

import { NavLeftComponent } from './nav/NavLeftComponent';

import { NavTemplateComponent } from './nav/NavTemplateComponent';

import { NavRightComponent } from './nav/NavRightComponent';

import { NavSelectableComponent } from './nav/NavSelectableComponent';

import { NavSubmenuComponent } from './nav/NavSubmenuComponent';

import { NavThemeComponent } from './nav/NavThemeComponent';

import { NavWidthComponent } from './nav/NavWidthComponent';

import { NotificationAnimationComponent } from './notification/NotificationAnimationComponent'

import { NotificationBasicComponent } from './notification/NotificationBasicComponent'

import { NotificationCloseComponent } from './notification/NotificationCloseComponent'

import { NotificationDurationComponent } from './notification/NotificationDurationComponent'

import { NotificationEventsComponent } from './notification/NotificationEventsComponent'

import { NotificationHoverPauseComponent } from './notification/NotificationHoverPauseComponent'

import { NotificationNameComponent } from './notification/NotificationNameComponent'

import { NotificationPositionComponent } from './notification/NotificationPositionComponent'

import { NotificationTemplateComponent } from './notification/NotificationTemplateComponent'

import { NotificationTypeComponent } from './notification/NotificationTypeComponent'

import { OverflowMaxlineComponent } from './overflow/OverflowMaxlineComponent';

import { OverflowMaxwidthComponent } from './overflow/OverflowMaxwidthComponent';

import { OverflowTipcontentComponent } from './overflow/OverflowTipcontentComponent';

import { OverflowPositionComponent } from './overflow/OverflowPositionComponent';

import { PaginationAutohideComponent } from './pagination/PaginationAutohideComponent';

import { PaginationPageselectwidthComponent } from './pagination/PaginationPageselectwidthComponent';

import { PaginationDisabledComponent } from './pagination/PaginationDisabledComponent';

import { PaginationEventComponent } from './pagination/PaginationEventComponent';

import { PaginationFixedComponent } from './pagination/PaginationFixedComponent';

import { PaginationPagesizeComponent } from './pagination/PaginationPagesizeComponent';

import { PaginationShowlastpageComponent } from './pagination/PaginationShowlastpageComponent';

import { PaginationShowgotolinkComponent } from './pagination/PaginationShowgotolinkComponent';

import { PaginationShowtotalnumberComponent } from './pagination/PaginationShowtotalnumberComponent';

import { PaginationTypeComponent } from './pagination/PaginationTypeComponent';

import { PopconfirmBasicComponent } from './popconfirm/PopconfirmBasicComponent';

import { PopconfirmDefineComponent } from './popconfirm/PopconfirmDefineComponent';

import { PopconfirmEventComponent } from './popconfirm/PopconfirmEventComponent';

import { PopconfirmTableComponent } from './popconfirm/PopconfirmTableComponent';

import { PopconfirmTableDefineComponent } from './popconfirm/PopconfirmTableDefineComponent';

import { ProgressbarAnimationComponent } from './progressbar/ProgressbarAnimationComponent';

import { ProgressbarBasicComponent } from './progressbar/ProgressbarBasicComponent';

import { ProgressbarClassComponent } from './progressbar/ProgressbarClassComponent';

import { RadioBasicComponent } from './radio/RadioBasicComponent';

import { RadioDarkComponent } from './radio/RadioDarkComponent';

import { RadioDisabledComponent } from './radio/RadioDisabledComponent';

import { RadioEventComponent } from './radio/RadioEventComponent';

import { RadioFocusComponent } from './radio/RadioFocusComponent';

import { RadioLabelComponent } from './radio/RadioLabelComponent';

import { RadiogroupBasicComponent } from './radiogroup/RadiogroupBasicComponent';

import { RadiogroupDefineComponent } from './radiogroup/RadiogroupDefineComponent';

import { RadiogroupDirectionComponent } from './radiogroup/RadiogroupDirectionComponent';

import { RadiogroupStyleComponent } from './radiogroup/RadiogroupStyleComponent';

import { RadiogroupLabelkeyComponent } from './radiogroup/RadiogroupLabelkeyComponent';

import { RadiogroupValuekeyComponent } from './radiogroup/RadiogroupValuekeyComponent';

import { RadiogroupValidationComponent } from './radiogroup/RadiogroupValidationComponent';

import { RadiogroupReactiveValidationComponent } from './radiogroup/RadiogroupReactiveValidationComponent';

import { RateBasicComponent } from './rate/RateBasicComponent';

import { RateDisabledComponent } from './rate/RateDisabledComponent';

import { RateEventComponent } from './rate/RateEventComponent';

import { SearchboxAppendtobodyComponent } from './searchbox/SearchboxAppendtobodyComponent';

import { SearchboxBasicComponent } from './searchbox/SearchboxBasicComponent';

import { SearchboxTemplateComponent } from './searchbox/SearchboxTemplateComponent';

import { SearchboxDisabledComponent } from './searchbox/SearchboxDisabledComponent';

import { SearchboxEventComponent } from './searchbox/SearchboxEventComponent';

import { SearchboxNotsearchComponent } from './searchbox/SearchboxNotsearchComponent';

import { SearchboxPanelsizeComponent } from './searchbox/SearchboxPanelsizeComponent';

import { SearchboxSuggestComponent } from './searchbox/SearchboxSuggestComponent';

import { SearchboxTestComponent } from './searchbox/SearchboxTestComponent';

import { SearchboxTrimmedComponent } from './searchbox/SearchboxTrimmedComponent';

import { SearchboxReactiveComponent } from './searchbox/SearchboxReactiveComponent';

import { SearchboxOptionsComponent } from './searchbox/SearchboxOptionsComponent';

import { SearchboxMaxlengthComponent } from './searchbox/SearchboxMaxlengthComponent';

import { SearchboxValidComponent } from './searchbox/SearchboxValidComponent';

import { SelectAppendtobodyComponent } from './select/SelectAppendtobodyComponent';

import { SelectBasicComponent } from './select/SelectBasicComponent';

import { SelectBeforesearchComponent } from './select/SelectBeforesearchComponent';

import { SelectChangeSelectallComponent } from './select/SelectChangeSelectallComponent';

import { SelectClearableComponent } from './select/SelectClearableComponent';

import { SelectDisabledComponent } from './select/SelectDisabledComponent';

import { SelectDisabledfocusComponent } from './select/SelectDisabledfocusComponent';

import { SelectEnumComponent } from './select/SelectEnumComponent';

import { SelectEventComponent } from './select/SelectEventComponent';

import { SelectFocusComponent } from './select/SelectFocusComponent';

import { SelectGroupComponent } from './select/SelectGroupComponent';

import { SelectIdComponent } from './select/SelectIdComponent';

import { SelectIdkeyComponent } from './select/SelectIdkeyComponent';

import { SelectInputComponent } from './select/SelectInputComponent';

import { SelectLazyComponent } from './select/SelectLazyComponent';

import { SelectLeakComponent } from './select/SelectLeakComponent';

import { SelectLoadComponent } from './select/SelectLoadComponent';

import { SelectManyComponent } from './select/SelectManyComponent';

import { SelectMaxlineComponent } from './select/SelectMaxlineComponent';

import { SelectMuchComponent } from './select/SelectMuchComponent';

import { SelectShowselectednumberComponent } from './select/SelectShowselectednumberComponent';

import { SelectMultiComponent } from './select/SelectMultiComponent';

import { SelectNoborderComponent } from './select/SelectNoborderComponent';

import { SelectNodataComponent } from './select/SelectNodataComponent';

import { SelectNoemptyComponent } from './select/SelectNoemptyComponent';

import { SelectNullComponent } from './select/SelectNullComponent';

import { SelectPaginBeforesearchComponent } from './select/SelectPaginBeforesearchComponent';

import { SelectPaginationComponent } from './select/SelectPaginationComponent';

import { SelectPanelComponent } from './select/SelectPanelComponent';

import { SelectSearchkeysComponent } from './select/SelectSearchkeysComponent';

import { SelectReservesearchwordComponent } from './select/SelectReservesearchwordComponent';

import { SelectScrollLoadComponent } from './select/SelectScrollLoadComponent';

import { SelectSearchComponent } from './select/SelectSearchComponent';

import { SelectSelectallComponent } from './select/SelectSelectallComponent';

import { SelectSmallComponent } from './select/SelectSmallComponent';

import { SelectTagComponent } from './select/SelectTagComponent';

import { SelectTemplateComponent } from './select/SelectTemplateComponent';

import { SelectTipComponent } from './select/SelectTipComponent';

import { SelectTiscrollComponent } from './select/SelectTiscrollComponent';

import { SelectTworowComponent } from './select/SelectTworowComponent';

import { SelectValidComponent } from './select/SelectValidComponent';

import { SelectValidgroupComponent } from './select/SelectValidgroupComponent';

import { SelectValuekeyTestComponent } from './select/SelectValuekeyTestComponent';

import { SelectValuekeyComponent } from './select/SelectValuekeyComponent';

import { SelectLabelkeyComponent } from './select/SelectLabelkeyComponent';

import { SelectVirtualscrollMultiComponent } from './select/SelectVirtualscrollMultiComponent';

import { SelectVirtualscrollComponent } from './select/SelectVirtualscrollComponent';

import { SkeletonPageComponent } from './skeleton/SkeletonPageComponent';

import { SkeletonTitleComponent } from './skeleton/SkeletonTitleComponent';

import { SkeletonTypeComponent } from './skeleton/SkeletonTypeComponent';

import { SliderEventComponent } from './slider/SliderEventComponent';

import { SliderHiddenComponent } from './slider/SliderHiddenComponent';

import { SliderLimitsComponent } from './slider/SliderLimitsComponent';

import { SliderFormcontrolComponent } from './slider/SliderFormcontrolComponent';

import { SliderRatiosComponent } from './slider/SliderRatiosComponent';

import { SliderScalesComponent } from './slider/SliderScalesComponent';

import { SliderTemplateComponent } from './slider/SliderTemplateComponent';

import { SliderTipComponent } from './slider/SliderTipComponent';

import { SpinnerBasicTestComponent } from './spinner/SpinnerBasicTestComponent';

import { SpinnerBasicComponent } from './spinner/SpinnerBasicComponent';

import { SpinnerCorrectableComponent } from './spinner/SpinnerCorrectableComponent';

import { SpinnerDisabledComponent } from './spinner/SpinnerDisabledComponent';

import { SpinnerEventComponent } from './spinner/SpinnerEventComponent';

import { SpinnerFormatComponent } from './spinner/SpinnerFormatComponent';

import { SpinnerLoadComponent } from './spinner/SpinnerLoadComponent';

import { SpinnerLocaleableComponent } from './spinner/SpinnerLocaleableComponent';

import { SpinnerMaxMinComponent } from './spinner/SpinnerMaxMinComponent';

import { SpinnerMaxlengthComponent } from './spinner/SpinnerMaxlengthComponent';

import { SpinnerStepComponent } from './spinner/SpinnerStepComponent';

import { SpinnerStepfnComponent } from './spinner/SpinnerStepfnComponent';

import { SpinnerTipComponent } from './spinner/SpinnerTipComponent';

import { SpinnerValidationTestComponent } from './spinner/SpinnerValidationTestComponent';

import { SpinnerValidationComponent } from './spinner/SpinnerValidationComponent';

import { SubtitleItemsComponent } from './subtitle/SubtitleItemsComponent';

import { SubtitleDarkComponent } from './subtitle/SubtitleDarkComponent';

import { SubtitleMaxwidthComponent } from './subtitle/SubtitleMaxwidthComponent';

import { SubtitlePanelwidthComponent } from './subtitle/SubtitlePanelwidthComponent';

import { SubtitleTargetComponent } from './subtitle/SubtitleTargetComponent';

import { SubtitleSearchableComponent } from './subtitle/SubtitleSearchableComponent';

import { SubtitleIdkeyComponent } from './subtitle/SubtitleIdkeyComponent';

import { SubtitleScrollLoadComponent } from './subtitle/SubtitleScrollLoadComponent';

import { SubtitleTipPositionComponent } from './subtitle/SubtitleTipPositionComponent';

import { SubtitleBeforeSearchComponent } from './subtitle/SubtitleBeforeSearchComponent';

import { SubtitleEventComponent } from './subtitle/SubtitleEventComponent';

import { StepsActiveComponent } from './steps/StepsActiveComponent';

import { StepsAdaptiveTestComponent } from './steps/StepsAdaptiveTestComponent';

import { StepsAdaptiveComponent } from './steps/StepsAdaptiveComponent';

import { StepsBaseComponent } from './steps/StepsBaseComponent';

import { StepsBeforeComponent } from './steps/StepsBeforeComponent';

import { StepsClickableComponent } from './steps/StepsClickableComponent';

import { StepsLabelComponent } from './steps/StepsLabelComponent';

import { StepsMaxwidthComponent } from './steps/StepsMaxwidthComponent';

import { StepsTemplateComponent } from './steps/StepsTemplateComponent';

import { StepsEventsComponent } from './steps/StepsEventsComponent';

import { SwitchBasicComponent } from './switch/SwitchBasicComponent';

import { SwitchBeforeComponent } from './switch/SwitchBeforeComponent';

import { SwitchDisabledComponent } from './switch/SwitchDisabledComponent';

import { SwitchEventComponent } from './switch/SwitchEventComponent';

import { SwitchExplanationComponent } from './switch/SwitchExplanationComponent';

import { SwitchTemplateComponent } from './switch/SwitchTemplateComponent';

import { SwitchFocusComponent } from './switch/SwitchFocusComponent';

import { SwitchIdComponent } from './switch/SwitchIdComponent';

import { SwitchLoadComponent } from './switch/SwitchLoadComponent';

import { SwiperBasicComponent } from './swiper/SwiperBasicComponent';
import { SwiperShowcardnumComponent } from './swiper/SwiperShowcardnumComponent';
import { SwiperActiveindexComponent } from './swiper/SwiperActiveindexComponent';
import { SwiperEventsComponent } from './swiper/SwiperEventsComponent';
import { SwiperAutoplayComponent } from './swiper/SwiperAutoplayComponent';
import { SwiperLoopComponent } from './swiper/SwiperLoopComponent';
import { SwiperIndicatorpositionComponent } from './swiper/SwiperIndicatorpositionComponent';

import { TabBasicComponent } from './tab/TabBasicComponent';

import { TabBeforeactivechangeComponent } from './tab/TabBeforeactivechangeComponent';

import { TabContentCompComponent } from './tab/TabContentCompComponent';

import { TabCustomHeadComponent } from './tab/TabCustomHeadComponent';

import { TabDefaultTestComponent } from './tab/TabDefaultTestComponent';

import { TabLazyLoadComponent } from './tab/TabLazyLoadComponent';

import { TabLevel2TestComponent } from './tab/TabLevel2TestComponent';

import { TabLevel2Component } from './tab/TabLevel2Component';

import { TabOverflowComponent } from './tab/TabOverflowComponent';

import { TabScrollComponent } from './tab/TabScrollComponent';

import { TabSmallComponent } from './tab/TabSmallComponent';

import { TabDarkComponent } from './tab/TabDarkComponent';

import { TabRouteComponent } from './tab/TabRouteComponent';

import { TableActionmenuComponent } from './table/TableActionmenuComponent';

import { TableBasicTestComponent } from './table/TableBasicTestComponent';

import { TableBasicComponent } from './table/TableBasicComponent';

import { TableCellTipComponent } from './table/TableCellTipComponent';

import { TableCelliconsColsresizableComponent } from './table/TableCelliconsColsresizableComponent';

import { TableCheckboxPaginationHeadmenuComponent } from './table/TableCheckboxPaginationHeadmenuComponent';

import { TableCheckboxPaginationComponent } from './table/TableCheckboxPaginationComponent';

import { TableCheckboxComponent } from './table/TableCheckboxComponent';

import { TableColAlignComponent } from './table/TableColAlignComponent';

import { TableColalignSortResizableTestComponent } from './table/TableColalignSortResizableTestComponent';

import { TableColsresizableBasicComponent } from './table/TableColsresizableBasicComponent';

import { TableColsResizableComponent } from './table/TableColsResizableComponent';

import { TableColsToggleDetailsComponent } from './table/TableColsToggleDetailsComponent';

import { TableColsToggleTestComponent } from './table/TableColsToggleTestComponent';

import { TableColsToggleComponent } from './table/TableColsToggleComponent';

import { TableColsresizableColstoggleFixedheadComponent } from './table/TableColsresizableColstoggleFixedheadComponent';

import { TableColsresizableColstoggleComponent } from './table/TableColsresizableColstoggleComponent';

import { TableColsresizableLoadfailComponent } from './table/TableColsresizableLoadfailComponent';

import { TableColsresizableSortHeadfilterComponent } from './table/TableColsresizableSortHeadfilterComponent';

import { TableColsresizableSortComponent } from './table/TableColsresizableSortComponent';

import { TableColumnFixedComponent } from './table/TableColumnFixedComponent';

import { TableColumnfixedCheckboxComponent } from './table/TableColumnfixedCheckboxComponent';

import { TableColumnfixedColstoggleComponent } from './table/TableColumnfixedColstoggleComponent';

import { TableColumnfixedEditrowComponent } from './table/TableColumnfixedEditrowComponent';

import { TableColumnfixedFixedheadColsresizablePaginationComponent } from './table/TableColumnfixedFixedheadColsresizablePaginationComponent';

import { TableColumnfixedHeadfixedComponent } from './table/TableColumnfixedHeadfixedComponent';

import { TableColumnfixedLeftmenuComponent } from './table/TableColumnfixedLeftmenuComponent';

import { TableColumnfixedNodataComponent } from './table/TableColumnfixedNodataComponent';

import { TableColumnfixedPaginationComponent } from './table/TableColumnfixedPaginationComponent';

import { TableColumnfixedResizableComponent } from './table/TableColumnfixedResizableComponent';

import { TableComprehensiveComponent } from './table/TableComprehensiveComponent';

import { TableDetailsCloseotherdetailsComponent } from './table/TableDetailsCloseotherdetailsComponent';

import { TableDetailsNesttableComponent } from './table/TableDetailsNesttableComponent';

import { TableDetailsPaginationComponent } from './table/TableDetailsPaginationComponent';

import { TableDetailsComponent } from './table/TableDetailsComponent';

import { TableDynamicDetailsComponent } from './table/TableDynamicDetailsComponent';

import { TableEditallTestComponent } from './table/TableEditallTestComponent';

import { TableEditallComponent } from './table/TableEditallComponent';

import { TableEditrowTestComponent } from './table/TableEditrowTestComponent';

import { TableEditrowComponent } from './table/TableEditrowComponent';

import { TableFilterStrictComponent } from './table/TableFilterStrictComponent';

import { TableFilterComponent } from './table/TableFilterComponent';

import { TableFixedHeadColsResizableComponent } from './table/TableFixedHeadColsResizableComponent';

import { TableFixedHeadInAccordionComponent } from './table/TableFixedHeadInAccordionComponent';

import { TableFixedHeadNodataComponent } from './table/TableFixedHeadNodataComponent';

import { TableFixedHeadPaginationDetailsComponent } from './table/TableFixedHeadPaginationDetailsComponent';

import { TableFixedHeadComponent } from './table/TableFixedHeadComponent';

import { TableFixedheadColsresizablePaginationDetailsComponent } from './table/TableFixedheadColsresizablePaginationDetailsComponent';

import { TableFixheadScrollComponent } from './table/TableFixheadScrollComponent';

import { TableGroupComponent } from './table/TableGroupComponent';

import { TableGuideComponent } from './table/TableGuideComponent';

import { TableHeadFilterDatetimeTestComponent } from './table/TableHeadFilterDatetimeTestComponent';

import { TableHeadFilterDatetimeComponent } from './table/TableHeadFilterDatetimeComponent';

import { TableHeadFilterMultiValuekeyComponent } from './table/TableHeadFilterMultiValuekeyComponent';

import { TableHeadFilterMultiComponent } from './table/TableHeadFilterMultiComponent';

import { TableHeadFilterValuekeyComponent } from './table/TableHeadFilterValuekeyComponent';

import { TableHeadFilterVirtualscrollComponent } from './table/TableHeadFilterVirtualscrollComponent';

import { TableHeadFilterComponent } from './table/TableHeadFilterComponent';

import { TableHeadFilterTestComponent } from './table/TableHeadFilterTestComponent';

import { TableLoadFailComponent } from './table/TableLoadFailComponent';

import { TableNodataSimpleComponent } from './table/TableNodataSimpleComponent';

import { TableNodataComponent } from './table/TableNodataComponent';

import { TableNodataTestComponent } from './table/TableNodataTestComponent';

import { TableOverflowLinkComponent } from './table/TableOverflowLinkComponent';

import { TablePagiWithFilterComponent } from './table/TablePagiWithFilterComponent';

import { TablePaginationComponent } from './table/TablePaginationComponent';

import { TableRadioTestComponent } from './table/TableRadioTestComponent';

import { TableRadioComponent } from './table/TableRadioComponent';

import { TableRowDrag2Component } from './table/TableRowDrag2Component';

import { TableRowspanComponent } from './table/TableRowspanComponent';

import { TableSearchComponent } from './table/TableSearchComponent';

import { TableServerPagiSearchSortComponent } from './table/TableServerPagiSearchSortComponent';

import { TableServerPagiComponent } from './table/TableServerPagiComponent';

import { TableSmallComponent } from './table/TableSmallComponent';

import { TableSoldoutComponent } from './table/TableSoldoutComponent';

import { TableSortComparefnLocaleComponent } from './table/TableSortComparefnLocaleComponent';

import { TableSortComparefnComponent } from './table/TableSortComparefnComponent';

import { TableSortDetailsComponent } from './table/TableSortDetailsComponent';

import { TableSortTestComponent } from './table/TableSortTestComponent';

import { TableSortBasicComponent } from './table/TableSortBasicComponent';

import { TableSortComponent } from './table/TableSortComponent';

import { TableSortResetComponent } from './table/TableSortResetComponent';

import { TableStorageConfigComponent } from './table/TableStorageConfigComponent';

import { TableStorageFilterComponent } from './table/TableStorageFilterComponent';

import { TableStorageServeComponent } from './table/TableStorageServeComponent';

import { TableStorageComponent } from './table/TableStorageComponent';

import { TableTreeMulitiselectComponent } from './table/TableTreeMulitiselectComponent';

import { TableTreeUnknowdeepthComponent } from './table/TableTreeUnknowdeepthComponent';

import { TableTreeComponent } from './table/TableTreeComponent';

import { TableVirtualscrollBasicComponent } from './table/TableVirtualscrollBasicComponent';

import { TableVirtualscrollComprehensiveComponent } from './table/TableVirtualscrollComprehensiveComponent';

import { TableVirtualscrollSizesComponent } from './table/TableVirtualscrollSizesComponent';

import { TableVirtualscrollTreeComponent } from './table/TableVirtualscrollTreeComponent';

import { TableVirtualscrollComponent } from './table/TableVirtualscrollComponent';

import { TagDefaultComponent } from './tag/TagDefaultComponent';

import { TagBasicComponent } from './tag/TagBasicComponent';

import { TagDisabledComponent } from './tag/TagDisabledComponent';

import {TagEditComponent} from './tag/TagEditComponent';

import { TagsinputBasicComponent } from './tagsinput/TagsinputBasicComponent';

import { TagsinputDisabledComponent } from './tagsinput/TagsinputDisabledComponent';

import { TagsinputEventsComponent } from './tagsinput/TagsinputEventsComponent';

import { TagsinputLabelkeyComponent } from './tagsinput/TagsinputLabelkeyComponent';

import { TagsinputNullComponent } from './tagsinput/TagsinputNullComponent';

import { TagsinputPanelwidthComponent } from './tagsinput/TagsinputPanelwidthComponent';

import { TagsinputSuggestionComponent } from './tagsinput/TagsinputSuggestionComponent';

import { TagsinputValidComponent } from './tagsinput/TagsinputValidComponent';

import { TagsinputValuekeyComponent } from './tagsinput/TagsinputValuekeyComponent';

import { TagsinputReactiveComponent } from './tagsinput/TagsinputReactiveComponent';

import { TagsinputTemplateComponent } from './tagsinput/TagsinputTemplateComponent';

import { TextBasicComponent } from './text/TextBasicComponent';

import { TextClearComponent } from './text/TextClearComponent';

import { TextDisabledComponent } from './text/TextDisabledComponent';

import { TextEventsComponent } from './text/TextEventsComponent';

import { TextFocusComponent } from './text/TextFocusComponent';

import { TextNoborderTestComponent } from './text/TextNoborderTestComponent';

import { TextPasswordComponent } from './text/TextPasswordComponent';

import { TextPasswordVisibleComponent } from './text/TextPasswordVisibleComponent';

import { TextReadonlyComponent } from './text/TextReadonlyComponent';

import { TextReactiveComponent } from './text/TextReactiveComponent';

import { TextMaskinputComponent } from './text/TextMaskinputComponent';

import { TextareaAutofocusComponent } from './textarea/TextareaAutofocusComponent';

import { TextareaDisabledComponent } from './textarea/TextareaDisabledComponent';

import { TextareaMaxlengthComponent } from './textarea/TextareaMaxlengthComponent';

import { TextareaNoneComponent } from './textarea/TextareaNoneComponent';

import { TextareaResizeComponent } from './textarea/TextareaResizeComponent';

import { TextareaScrollComponent } from './textarea/TextareaScrollComponent';

import { TextareaValidComponent } from './textarea/TextareaValidComponent';

import { TextareaWidthComponent } from './textarea/TextareaWidthComponent';

import { ThemeBasicComponent } from './theme/ThemeBasicComponent';

import { TimeCleariconComponent } from './time/TimeCleariconComponent';

import { TimeEventComponent } from './time/TimeEventComponent';

import { TimeFormatComponent } from './time/TimeFormatComponent';

import { TimeMaxminComponent } from './time/TimeMaxminComponent';

import { TimeReactiveComponent } from './time/TimeReactiveComponent';

import { TimeOptionDisabledComponent } from './time/TimeOptionDisabledComponent';

import { TimePanelalignComponent } from './time/TimePanelalignComponent';

import { TimeValidationComponent } from './time/TimeValidationComponent';

import { TimelineBasicComponent } from './timeline/TimelineBasicComponent';

import { TimelineTypeComponent } from './timeline/TimelineTypeComponent';

import { TimelineMultiComponent } from './timeline/TimelineMultiComponent';

import { TimelineDarkComponent } from './timeline/TimelineDarkComponent';

import { TimelineHelptipComponent } from './timeline/TimelineHelptipComponent';

import { TimelineTempleteComponent } from './timeline/TimelineTempleteComponent';

import { TipBasicComponent } from './tip/TipBasicComponent';

import { TipPositionComponent } from './tip/TipPositionComponent';

import { TipContentTemplateComponent } from './tip/TipContentTemplateComponent';

import { TipContentCompComponent, TipDemoComponent } from './tip/TipContentCompComponent';

import { TipHasArrowComponent } from './tip/TipHasArrowComponent';

import { TipMaxWidthComponent } from './tip/TipMaxWidthComponent';

import { TipTriggerComponent } from './tip/TipTriggerComponent';

import { TipServiceComponent } from './tip/TipServiceComponent';

import { TipZindexComponent } from './tip/TipZindexComponent';

import { TransferBasicComponent } from './transfer/TransferBasicComponent';

import { TransferLazyComponent } from './transfer/TransferLazyComponent';

import { TransferSizeComponent } from './transfer/TransferSizeComponent';

import { TransferLabelkeyComponent } from './transfer/TransferLabelkeyComponent';

import { TransferNodatatextComponent } from './transfer/TransferNodatatextComponent';

import { TransferEventComponent } from './transfer/TransferEventComponent';

import { TransferTitlesComponent } from './transfer/TransferTitlesComponent';

import { TransferDisabledComponent } from './transfer/TransferDisabledComponent';

import { TransferLoadComponent } from './transfer/TransferLoadComponent';

import { TransferSearchableComponent } from './transfer/TransferSearchableComponent';

import { TransferSearchkeysComponent } from './transfer/TransferSearchkeysComponent';

import { TransferPlaceholderComponent } from './transfer/TransferPlaceholderComponent';

import { TransferIdkeyComponent } from './transfer/TransferIdkeyComponent';

import { TransferPaginationComponent } from './transfer/TransferPaginationComponent';

import { TransferIdComponent } from './transfer/TransferIdComponent';

import { TransferTableComponent } from './transfer/TransferTableComponent';

import { TreeBeforeExpandComponent } from './tree/TreeBeforeExpandComponent';

import { TreeBeforeMoreComponent } from './tree/TreeBeforeMoreComponent';

import { TreeChangedbycheckboxComponent } from './tree/TreeChangedbycheckboxComponent';

import { TreeCheckRelationComponent } from './tree/TreeCheckRelationComponent';

import { TreeDisabledComponent } from './tree/TreeDisabledComponent';

import { TreeDragBeforedropComponent } from './tree/TreeDragBeforedropComponent';

import { TreeDragComponent } from './tree/TreeDragComponent';

import { TreeEventComponent } from './tree/TreeEventComponent';

import { TreeIconComponent } from './tree/TreeIconComponent';

import { TreeLoadComponent } from './tree/TreeLoadComponent';

import { TreeManyComponent } from './tree/TreeManyComponent';

import { TreeMultiselectComponent } from './tree/TreeMultiselectComponent';

import { TreeOperateComponent } from './tree/TreeOperateComponent';

import { TreeParentcheckableComponent } from './tree/TreeParentcheckableComponent';

import { TreeRadioselectComponent } from './tree/TreeRadioselectComponent';

import { TreeSearchComponent } from './tree/TreeSearchComponent';

import { TreeShortcutkeyComponent } from './tree/TreeShortcutkeyComponent';

import { TreeSmallComponent } from './tree/TreeSmallComponent';

import { TreeTemplateComponent } from './tree/TreeTemplateComponent';

import { TreeUtilComponent } from './tree/TreeUtilComponent';

import { TreeVirtualscrollDragComponent } from './tree/TreeVirtualscrollDragComponent';

import { TreeVirtualscrollSmallComponent } from './tree/TreeVirtualscrollSmallComponent';

import { TreeVirtualscrollComponent } from './tree/TreeVirtualscrollComponent';

import { TreeselectBasicComponent } from './treeselect/TreeselectBasicComponent';

import { TreeselectMultiComponent } from './treeselect/TreeselectMultiComponent';

import { TreeselectBeforeExpandComponent } from './treeselect/TreeselectBeforeExpandComponent';

import { TreeselectBeforeMoreComponent } from './treeselect/TreeselectBeforeMoreComponent';

import { TreeselectClearableComponent } from './treeselect/TreeselectClearableComponent';

import { TreeselectDisabledComponent } from './treeselect/TreeselectDisabledComponent';

import { TreeselectDropmaxheightComponent } from './treeselect/TreeselectDropmaxheightComponent';

import { TreeselectEventComponent } from './treeselect/TreeselectEventComponent';

import { TreeselectFocusComponent } from './treeselect/TreeselectFocusComponent';

import { TreeselectMaxlineComponent } from './treeselect/TreeselectMaxlineComponent';

import { TreeselectPanelwidthComponent } from './treeselect/TreeselectPanelwidthComponent';

import { TreeselectLazyloadComponent } from './treeselect/TreeselectLazyloadComponent';

import { TreeselectLoadComponent } from './treeselect/TreeselectLoadComponent';

import { TreeselectModalComponent } from './treeselect/TreeselectModalComponent';

import { TreeselectNodataComponent } from './treeselect/TreeselectNodataComponent';

import { TreeselectOptionsChangeComponent } from './treeselect/TreeselectOptionsChangeComponent';

import { TreeselectSearchComponent } from './treeselect/TreeselectSearchComponent';

import { TreeselectSelectallComponent } from './treeselect/TreeselectSelectallComponent';

import { TreeselectValidationComponent } from './treeselect/TreeselectValidationComponent';

import { TreeselectLabelkeyComponent } from './treeselect/TreeselectLabelkeyComponent';

import { UploadAutoUploadComponent } from './upload/UploadAutoUploadComponent';

import { UploadBasicComponent } from './upload/UploadBasicComponent';

import { UploadBatchSendComponent } from './upload/UploadBatchSendComponent';

import { UploadBeforeremoveComponent } from './upload/UploadBeforeremoveComponent';

import { UploadButtonTestComponent } from './upload/UploadButtonTestComponent';

import { UploadButtonComponent } from './upload/UploadButtonComponent';

import { UploadPropsComponent } from './upload/UploadPropsComponent';

import { UploadCaseTestComponent } from './upload/UploadCaseTestComponent';

import { UploadChangesComponent } from './upload/UploadChangesComponent';

import { UploadEventComponent } from './upload/UploadEventComponent';

import { UploadFilterComponent } from './upload/UploadFilterComponent';

import { UploadFormDataComponent } from './upload/UploadFormDataComponent';

import { UploadInputFieldTestComponent } from './upload/UploadInputFieldTestComponent';

import { UploadServiceTestComponent } from './upload/UploadServiceTestComponent';

import { UploadServiceComponent } from './upload/UploadServiceComponent';

import { UploadSingleComponent } from './upload/UploadSingleComponent';

import { UploadCustomComponent } from './upload/UploadCustomComponent';

import { UploadimageBasicComponent } from './uploadimage/UploadimageBasicComponent';

import { UploadimageAutoUploadComponent } from './uploadimage/UploadimageAutoUploadComponent';

import { UploadimageChangesComponent } from './uploadimage/UploadimageChangesComponent';

import { UploadimageDeletableComponent } from './uploadimage/UploadimageDeletableComponent';

import { UploadimageDisabledComponent } from './uploadimage/UploadimageDisabledComponent';

import { UploadimageDragComponent } from './uploadimage/UploadimageDragComponent';

import { UploadimageEventComponent } from './uploadimage/UploadimageEventComponent';

import { UploadimageFilterComponent } from './uploadimage/UploadimageFilterComponent';

import { UploadimageInitfilesComponent } from './uploadimage/UploadimageInitfilesComponent';

import { UploadimageMaxcountComponent } from './uploadimage/UploadimageMaxcountComponent';

import { UploadimageTemplateComponent } from './uploadimage/UploadimageTemplateComponent';

import { BrowserBasicComponent } from './utils/BrowserBasicComponent';

import { KeymapBasicComponent } from './utils/KeymapBasicComponent';

import { LogBasicComponent } from './utils/LogBasicComponent';

import { ValidationAsyncCheckTestComponent } from './validation/ValidationAsyncCheckTestComponent';

import { ValidationAsyncCheckComponent } from './validation/ValidationAsyncCheckComponent';

import { ValidationBasicControlComponent } from './validation/ValidationBasicControlComponent';

import { ValidationBasicDirectiveComponent } from './validation/ValidationBasicDirectiveComponent';

import { ValidationBlurCheckComponent } from './validation/ValidationBlurCheckComponent';

import { ValidationErrorMsgComponent } from './validation/ValidationErrorMsgComponent';

import { ValidationFormGroupConfigComponent } from './validation/ValidationFormGroupConfigComponent';

import { ValidationFormGroupTestComponent } from './validation/ValidationFormGroupTestComponent';

import { ValidationFormGroupComponent } from './validation/ValidationFormGroupComponent';

import { ValidationParamChangeComponent } from './validation/ValidationParamChangeComponent';

import { ValidationPwdCheckComponent } from './validation/ValidationPwdCheckComponent';

import { ValidationRulesCustomDirectiveComponent } from './validation/ValidationRulesCustomDirectiveComponent';

import { ValidationRulesCustomComponent } from './validation/ValidationRulesCustomComponent';

import { ValidationRulesTestComponent } from './validation/ValidationRulesTestComponent';

import { ValidationTemplateFormNestedComponent } from './validation/ValidationTemplateFormNestedComponent';

import { ValidationTipComponent } from './validation/ValidationTipComponent';

import { ValidationTiscrollComponent } from './validation/ValidationTiscrollComponent';

@Component({
  selector: `app-root`,
  template: ``
})
export class AppComponent { }

const WCS: any = [
  { selector: 'website-tiny-accordion-basic', component: AccordionBasicComponent },

  { selector: 'website-tiny-accordion-class', component: AccordionClassComponent },

  { selector: 'website-tiny-accordion-click-toggle', component: AccordionClickToggleComponent },

  { selector: 'website-tiny-accordion-close-others', component: AccordionCloseOthersComponent },

  { selector: 'website-tiny-accordion-disabled', component: AccordionDisabledComponent },

  { selector: 'website-tiny-accordion-open', component: AccordionOpenComponent },

  { selector: 'website-tiny-actionmenu-data', component: ActionmenuDataComponent },

  { selector: 'website-tiny-actionmenu-data2', component: ActionmenuData2Component },

  { selector: 'website-tiny-actionmenu-basic', component: ActionmenuBasicComponent },

  { selector: 'website-tiny-actionmenu-divider', component: ActionmenuDividerComponent },

  { selector: 'website-tiny-actionmenu-event', component: ActionmenuEventComponent },

  { selector: 'website-tiny-actionmenu-focus', component: ActionmenuFocusComponent },

  { selector: 'website-tiny-actionmenu-id', component: ActionmenuIdComponent },

  { selector: 'website-tiny-actionmenu-items-change', component: ActionmenuItemsChangeComponent },

  { selector: 'website-tiny-actionmenu-items', component: ActionmenuItemsComponent },

  { selector: 'website-tiny-actionmenu-many', component: ActionmenuManyComponent },

  { selector: 'website-tiny-actionmenu-table', component: ActionmenuTableComponent },

  { selector: 'website-tiny-actionmenu-tips', component: ActionmenuTipsComponent },

  { selector: 'website-tiny-actionmenu-labelkey', component: ActionmenuLabelkeyComponent },

  { selector: 'website-tiny-actionmenu-disabled', component: ActionmenuDisabledComponent },

  { selector: 'website-tiny-actionmenu-space', component: ActionmenuSpaceComponent },

  { selector: 'website-tiny-actionmenu-menutext', component: ActionmenuMenutextComponent },

  { selector: 'website-tiny-actionmenu-panelstyle', component: ActionmenuPanelstyleComponent },

  { selector: 'website-tiny-actionmenu-templete', component: ActionmenuTempleteComponent },

  { selector: 'website-tiny-actionmenu-shownum', component: ActionmenuShownumComponent },

  { selector: 'website-tiny-alert-boxshadow', component: AlertBoxshadowComponent },

  { selector: 'website-tiny-alert-darktheme', component: AlertDarkthemeComponent },

  { selector: 'website-tiny-alert-dismiss', component: AlertDismissComponent },

  { selector: 'website-tiny-alert-event', component: AlertEventComponent },

  { selector: 'website-tiny-alert-icon', component: AlertIconComponent },

  { selector: 'website-tiny-alert-messages', component: AlertMessagesComponent },

  { selector: 'website-tiny-alert-open-test', component: AlertOpenTestComponent },

  { selector: 'website-tiny-alert-open', component: AlertOpenComponent },

  { selector: 'website-tiny-alert-size', component: AlertSizeComponent },

  { selector: 'website-tiny-alert-trigger-scroll', component: AlertTriggerScrollComponent },

  { selector: 'website-tiny-alert-type', component: AlertTypeComponent },

  { selector: 'website-tiny-anchor-basic', component: AnchorBasicComponent },

  { selector: 'website-tiny-anchor-events', component: AnchorEventsComponent },

  { selector: 'website-tiny-anchor-id', component: AnchorIdComponent },

  { selector: 'website-tiny-anchor-offsettop', component: AnchorOffsettopComponent },

  { selector: 'website-tiny-anchor-speed', component: AnchorSpeedComponent },

  { selector: 'website-tiny-anchor-template', component: AnchorTemplateComponent },

  { selector: 'website-tiny-anchor-scrolltarget', component: AnchorScrolltargetComponent },

  { selector: 'website-tiny-autocomplete-appendtobody', component: AutocompleteAppendtobodyComponent },

  { selector: 'website-tiny-autocomplete-basic', component: AutocompleteBasicComponent },

  { selector: 'website-tiny-autocomplete-clearable', component: AutocompleteClearableComponent },

  { selector: 'website-tiny-autocomplete-disabled', component: AutocompleteDisabledComponent },

  { selector: 'website-tiny-autocomplete-events', component: AutocompleteEventsComponent },

  { selector: 'website-tiny-autocomplete-labelkey', component: AutocompleteLabelkeyComponent },

  { selector: 'website-tiny-autocomplete-maxlength', component: AutocompleteMaxlengthComponent },

  { selector: 'website-tiny-autocomplete-panel-size', component: AutocompletePanelSizeComponent },

  { selector: 'website-tiny-autocomplete-test', component: AutocompleteTestComponent },

  { selector: 'website-tiny-autocomplete-tip', component: AutocompleteTipComponent },

  { selector: 'website-tiny-autocomplete-valid', component: AutocompleteValidComponent },

  { selector: 'website-tiny-autocomplete-template', component: AutocompleteTemplateComponent },

  { selector: 'website-tiny-avatar-size', component: AvatarSizeComponent },

  { selector: 'website-tiny-avatar-shape', component: AvatarShapeComponent },

  { selector: 'website-tiny-avatar-text', component: AvatarTextComponent },

  { selector: 'website-tiny-avatar-image', component: AvatarImageComponent },

  { selector: 'website-tiny-avatar-style', component: AvatarStyleComponent },

  { selector: 'website-tiny-avatar-image-error-test', component: AvatarImageErrorTestComponent },

  { selector: 'website-tiny-button-color', component: ButtonColorComponent },

  { selector: 'website-tiny-button-disabled', component: ButtonDisabledComponent },

  { selector: 'website-tiny-button-event', component: ButtonEventComponent },

  { selector: 'website-tiny-button-focus', component: ButtonFocusComponent },

  { selector: 'website-tiny-button-hasborder-test', component: ButtonHasborderTestComponent },

  { selector: 'website-tiny-button-hasborder', component: ButtonHasborderComponent },

  { selector: 'website-tiny-button-icon', component: ButtonIconComponent },

  { selector: 'website-tiny-button-loading', component: ButtonLoadingComponent },

  { selector: 'website-tiny-button-onlyicon', component: ButtonOnlyiconComponent },

  { selector: 'website-tiny-button-size', component: ButtonSizeComponent },

  { selector: 'website-tiny-button-tip', component: ButtonTipComponent },

  { selector: 'website-tiny-buttongroup-items', component: ButtongroupItemsComponent },

  { selector: 'website-tiny-buttongroup-activeclass', component: ButtongroupActiveclassComponent },

  { selector: 'website-tiny-buttongroup-beforeclick', component: ButtongroupBeforeclickComponent },

  { selector: 'website-tiny-buttongroup-template', component: ButtongroupTemplateComponent },

  { selector: 'website-tiny-buttongroup-deselectable', component: ButtongroupDeselectableComponent },

  { selector: 'website-tiny-buttongroup-disabled', component: ButtongroupDisabledComponent },

  { selector: 'website-tiny-buttongroup-enum', component: ButtongroupEnumComponent },

  { selector: 'website-tiny-buttongroup-event', component: ButtongroupEventComponent },

  { selector: 'website-tiny-buttongroup-focus', component: ButtongroupFocusComponent },

  { selector: 'website-tiny-buttongroup-id-test', component: ButtongroupIdTestComponent },

  { selector: 'website-tiny-buttongroup-id', component: ButtongroupIdComponent },

  { selector: 'website-tiny-buttongroup-items-test', component: ButtongroupItemsTestComponent },

  { selector: 'website-tiny-buttongroup-many', component: ButtongroupManyComponent },

  { selector: 'website-tiny-buttongroup-minwidth', component: ButtongroupMinwidthComponent },

  { selector: 'website-tiny-buttongroup-multi-type', component: ButtongroupMultiTypeComponent },

  { selector: 'website-tiny-buttongroup-multiline', component: ButtongroupMultilineComponent },

  { selector: 'website-tiny-buttongroup-multiple', component: ButtongroupMultipleComponent },

  { selector: 'website-tiny-buttongroup-radio-type', component: ButtongroupRadioTypeComponent },

  { selector: 'website-tiny-buttongroup-reactive-forms', component: ButtongroupReactiveFormsComponent },

  { selector: 'website-tiny-buttongroup-sup-test', component: ButtongroupSupTestComponent },

  { selector: 'website-tiny-buttongroup-sup', component: ButtongroupSupComponent },

  { selector: 'website-tiny-buttongroup-tip', component: ButtongroupTipComponent },

  { selector: 'website-tiny-buttongroup-valuekey-test', component: ButtongroupValuekeyTestComponent },

  { selector: 'website-tiny-buttongroup-valuekey', component: ButtongroupValuekeyComponent },

  { selector: 'website-tiny-browser-usage', component: BrowserUsageComponent },

  { selector: 'website-tiny-card-basic', component: CardBasicComponent },

  { selector: 'website-tiny-card-add', component: CardAddComponent },

  { selector: 'website-tiny-card-header', component: CardHeaderComponent },

  { selector: 'website-tiny-card-grid', component: CardGridComponent },

  { selector: 'website-tiny-card-grid2', component: CardGrid2Component },

  { selector: 'website-tiny-cascader-basic', component: CascaderBasicComponent },

  { selector: 'website-tiny-cascader-disabled', component: CascaderDisabledComponent },

  { selector: 'website-tiny-cascader-labelkey', component: CascaderLabelkeyComponent },

  { selector: 'website-tiny-cascader-valuekey', component: CascaderValuekeyComponent },

  { selector: 'website-tiny-cascader-idkey', component: CascaderIdkeyComponent },

  { selector: 'website-tiny-cascader-panel', component: CascaderPanelComponent },

  { selector: 'website-tiny-cascader-trigger', component: CascaderTriggerComponent },

  { selector: 'website-tiny-cascader-showalllevel', component: CascaderShowalllevelComponent },

  { selector: 'website-tiny-cascader-onlyselectleaf', component: CascaderOnlyselectleafComponent },

  { selector: 'website-tiny-cascader-events', component: CascaderEventsComponent },

  { selector: 'website-tiny-cascader-search', component: CascaderSearchComponent },

  { selector: 'website-tiny-checkbox-default', component: CheckboxDefaultComponent },

  { selector: 'website-tiny-checkbox-disabled', component: CheckboxDisabledComponent },

  { selector: 'website-tiny-checkbox-event', component: CheckboxEventComponent },

  { selector: 'website-tiny-checkbox-focused', component: CheckboxFocusedComponent },

  { selector: 'website-tiny-checkbox-indeterminate', component: CheckboxIndeterminateComponent },

  { selector: 'website-tiny-checkbox-label', component: CheckboxLabelComponent },

  { selector: 'website-tiny-checkgroup-basic', component: CheckgroupBasicComponent },

  { selector: 'website-tiny-checkgroup-change', component: CheckgroupChangeComponent },

  { selector: 'website-tiny-checkgroup-cross', component: CheckgroupCrossComponent },

  { selector: 'website-tiny-checkgroup-default', component: CheckgroupDefaultComponent },

  { selector: 'website-tiny-checkgroup-disabled', component: CheckgroupDisabledComponent },

  { selector: 'website-tiny-checkgroup-item', component: CheckgroupItemComponent },

  { selector: 'website-tiny-checkgroup-level', component: CheckgroupLevelComponent },

  { selector: 'website-tiny-checkgroup-refresh', component: CheckgroupRefreshComponent },

  { selector: 'website-tiny-checkgroup-scenes', component: CheckgroupScenesComponent },

  { selector: 'website-tiny-checkgroup-tree', component: CheckgroupTreeComponent },

  { selector: 'website-tiny-checkgroup-valuekey', component: CheckgroupValuekeyComponent },

  { selector: 'website-tiny-checkboxgroup-basic', component: CheckboxgroupBasicComponent },

  { selector: 'website-tiny-checkboxgroup-direction', component: CheckboxgroupDirectionComponent },

  { selector: 'website-tiny-checkboxgroup-linewrap', component: CheckboxgroupLinewrapComponent },

  { selector: 'website-tiny-checkboxgroup-template', component: CheckboxgroupTemplateComponent },

  { selector: 'website-tiny-checkboxgroup-valuekey', component: CheckboxgroupValuekeyComponent },

  { selector: 'website-tiny-checkboxgroup-labelkey', component: CheckboxgroupLabelkeyComponent },

  { selector: 'website-tiny-collapse-basic', component: CollapseBasicComponent },

  { selector: 'website-tiny-collapse-event', component: CollapseEventComponent },

  { selector: 'website-tiny-crumb-basic', component: CrumbBasicComponent },

  { selector: 'website-tiny-crumb-href', component: CrumbHrefComponent },

  { selector: 'website-tiny-crumb-router', component: CrumbRouterComponent },

  { selector: 'website-tiny-crumb-events', component: CrumbEventsComponent },

  { selector: 'website-tiny-date-customize', component: DateCustomizeComponent },

  { selector: 'website-tiny-date-disabled', component: DateDisabledComponent },

  { selector: 'website-tiny-date-disableddays', component: DateDisableddaysComponent },

  { selector: 'website-tiny-date-event', component: DateEventComponent },

  { selector: 'website-tiny-date-form', component: DateFormComponent },

  { selector: 'website-tiny-date-format', component: DateFormatComponent },

  { selector: 'website-tiny-date-max', component: DateMaxComponent },

  { selector: 'website-tiny-date-maxmin', component: DateMaxminComponent },

  { selector: 'website-tiny-date-min', component: DateMinComponent },

  { selector: 'website-tiny-date-nowdatetime', component: DateNowdatetimeComponent },

  { selector: 'website-tiny-date-panelalign', component: DatePanelalignComponent },

  { selector: 'website-tiny-date-validation', component: DateValidationComponent },

  { selector: 'website-tiny-date-value', component: DateValueComponent },

  { selector: 'website-tiny-date-clearicon', component: DateCleariconComponent },

  { selector: 'website-tiny-daterange-customize', component: DaterangeCustomizeComponent },

  { selector: 'website-tiny-daterange-disabled', component: DaterangeDisabledComponent },

  { selector: 'website-tiny-daterange-disableddays', component: DaterangeDisableddaysComponent },

  { selector: 'website-tiny-daterange-event', component: DaterangeEventComponent },

  { selector: 'website-tiny-daterange-fixedvalue', component: DaterangeFixedvalueComponent },

  { selector: 'website-tiny-daterange-format', component: DaterangeFormatComponent },

  { selector: 'website-tiny-daterange-isallowbeginequalend', component: DaterangeIsallowbeginequalendComponent },

  { selector: 'website-tiny-daterange-max', component: DaterangeMaxComponent },

  { selector: 'website-tiny-daterange-maxmin', component: DaterangeMaxminComponent },

  { selector: 'website-tiny-daterange-min', component: DaterangeMinComponent },

  { selector: 'website-tiny-daterange-nowdatetime', component: DaterangeNowdatetimeComponent },

  { selector: 'website-tiny-daterange-panelalign', component: DaterangePanelalignComponent },

  { selector: 'website-tiny-daterange-validation', component: DaterangeValidationComponent },

  { selector: 'website-tiny-daterange-value', component: DaterangeValueComponent },

  { selector: 'website-tiny-datetime-customize', component: DatetimeCustomizeComponent },

  { selector: 'website-tiny-datetime-disabled', component: DatetimeDisabledComponent },

  { selector: 'website-tiny-datetime-event', component: DatetimeEventComponent },

  { selector: 'website-tiny-datetime-format', component: DatetimeFormatComponent },

  { selector: 'website-tiny-datetime-max', component: DatetimeMaxComponent },

  { selector: 'website-tiny-datetime-min', component: DatetimeMinComponent },

  { selector: 'website-tiny-datetime-nowdatetime', component: DatetimeNowdatetimeComponent },

  { selector: 'website-tiny-datetime-validation', component: DatetimeValidationComponent },

  { selector: 'website-tiny-timeline-basic', component: TimelineBasicComponent },

  { selector: 'website-tiny-timeline-type', component: TimelineTypeComponent },

  { selector: 'website-tiny-timeline-multi', component: TimelineMultiComponent },

  { selector: 'website-tiny-timeline-dark', component: TimelineDarkComponent },

  { selector: 'website-tiny-timeline-helptip', component: TimelineHelptipComponent },

  { selector: 'website-tiny-timeline-templete', component: TimelineTempleteComponent },

  { selector: 'website-tiny-datetime-value', component: DatetimeValueComponent },

  { selector: 'website-tiny-datetime-maxmin', component: DatetimeMaxminComponent },

  { selector: 'website-tiny-datetime-panelalign', component: DatetimePanelalignComponent },

  { selector: 'website-tiny-datetime-clearicon', component: DatetimeCleariconComponent },

  { selector: 'website-tiny-datetimerange-customize', component: DatetimerangeCustomizeComponent },

  { selector: 'website-tiny-datetimerange-disabled', component: DatetimerangeDisabledComponent },

  { selector: 'website-tiny-datetimerange-event', component: DatetimerangeEventComponent },

  { selector: 'website-tiny-datetimerange-format', component: DatetimerangeFormatComponent },

  { selector: 'website-tiny-datetimerange-isallowbeginequalend', component: DatetimerangeIsallowbeginequalendComponent },

  { selector: 'website-tiny-datetimerange-many-test', component: DatetimerangeManyTestComponent },

  { selector: 'website-tiny-datetimerange-max', component: DatetimerangeMaxComponent },

  { selector: 'website-tiny-datetimerange-min', component: DatetimerangeMinComponent },

  { selector: 'website-tiny-datetimerange-nowdatetime', component: DatetimerangeNowdatetimeComponent },

  { selector: 'website-tiny-datetimerange-timezoneable', component: DatetimerangeTimezoneableComponent },

  { selector: 'website-tiny-datetimerange-validation', component: DatetimerangeValidationComponent },

  { selector: 'website-tiny-datetimerange-value', component: DatetimerangeValueComponent },

  { selector: 'website-tiny-datetimerange-maxmin', component: DatetimerangeMaxminComponent },

  { selector: 'website-tiny-datetimerange-panelalign', component: DatetimerangePanelalignComponent },

  { selector: 'website-tiny-datetimerange-clearicon', component: DatetimerangeCleariconComponent },

  { selector: 'website-tiny-formfield-colspan-rowspan', component: FormfieldColspanRowspanComponent },

  { selector: 'website-tiny-formfield-colswidth', component: FormfieldColswidthComponent },

  { selector: 'website-tiny-formfield-foo', component: FormfieldFooComponent },

  { selector: 'website-tiny-formfield-index', component: FormfieldIndexComponent },

  { selector: 'website-tiny-formfield-label', component: FormfieldLabelComponent },

  { selector: 'website-tiny-formfield-labelwidth', component: FormfieldLabelwidthComponent },

  { selector: 'website-tiny-formfield-multi-column', component: FormfieldMultiColumnComponent },

  { selector: 'website-tiny-formfield-nest-formfiled', component: FormfieldNestFormfiledComponent },

  { selector: 'website-tiny-formfield-ngfor-test', component: FormfieldNgforTestComponent },

  { selector: 'website-tiny-formfield-required', component: FormfieldRequiredComponent },

  { selector: 'website-tiny-formfield-show', component: FormfieldShowComponent },

  { selector: 'website-tiny-formfield-single-column', component: FormfieldSingleColumnComponent },

  { selector: 'website-tiny-formfield-test', component: FormfieldTestComponent },

  { selector: 'website-tiny-formfield-text-form', component: FormfieldTextFormComponent },

  { selector: 'website-tiny-formfield-vertical', component: FormfieldVerticalComponent },

  { selector: 'website-tiny-formfield-vertical-align', component: FormfieldVerticalAlignComponent },

  { selector: 'website-tiny-halfmodal-basic', component: HalfmodalBasicComponent },

  { selector: 'website-tiny-halfmodal-backdrop', component: HalfmodalBackdropComponent },

  { selector: 'website-tiny-halfmodal-beforehide', component: HalfmodalBeforehideComponent },

  { selector: 'website-tiny-halfmodal-content', component: HalfmodalContentComponent },

  { selector: 'website-tiny-halfmodal-service', component: HalfmodalServiceComponent },

 { selector: 'website-tiny-icon-basic', component: IconBasicComponent },

  { selector: 'website-tiny-icon-show', component: IconShowComponent },

  { selector: 'website-tiny-icon-setpath', component: IconSetpathComponent },

  { selector: 'website-tiny-imagepreview-basic', component: ImagepreviewBasicComponent },

  { selector: 'website-tiny-inputnumber-basic', component: InputnumberBasicComponent },

  { selector: 'website-tiny-inputnumber-event', component: InputnumberEventComponent },

  { selector: 'website-tiny-inputnumber-focus', component: InputnumberFocusComponent },

  { selector: 'website-tiny-inputnumber-format', component: InputnumberFormatComponent },

  { selector: 'website-tiny-inputnumber-load', component: InputnumberLoadComponent },

  { selector: 'website-tiny-inputnumber-localeable', component: InputnumberLocaleableComponent },

  { selector: 'website-tiny-inputnumber-maxlength', component: InputnumberMaxlengthComponent },

  { selector: 'website-tiny-intro-basic', component: IntroBasicComponent },

  { selector: 'website-tiny-intro-event', component: IntroEventComponent },

  { selector: 'website-tiny-intro-modal', component: IntroModalComponent },

  { selector: 'website-tiny-intro-skipable', component: IntroSkipableComponent },

  { selector: 'website-tiny-intro-template', component: IntroTemplateComponent },

  { selector: 'website-tiny-intro-tip', component: IntroTipComponent },

  { selector: 'website-tiny-intro-tiscroll', component: IntroTiscrollComponent },

  { selector: 'website-tiny-ip-basic', component: IpBasicComponent },

  { selector: 'website-tiny-ip-disabled', component: IpDisabledComponent },

  { selector: 'website-tiny-ip-formcontrol', component: IpFormcontrolComponent },

  { selector: 'website-tiny-ip-valid', component: IpValidComponent },

  { selector: 'website-tiny-ipsection-basic', component: IpsectionBasicComponent },

  { selector: 'website-tiny-ipsection-disabled', component: IpsectionDisabledComponent },

  { selector: 'website-tiny-ipsection-events', component: IpsectionEventsComponent },

  { selector: 'website-tiny-ipsection-focus', component: IpsectionFocusComponent },

  { selector: 'website-tiny-ipsection-test', component: IpsectionTestComponent },

  { selector: 'website-tiny-ipsection-valid-formgroup', component: IpsectionValidFormgroupComponent },

  { selector: 'website-tiny-ipsection-valid', component: IpsectionValidComponent },

  { selector: 'website-tiny-keymap-usage', component: KeymapUsageComponent },

  { selector: 'website-tiny-layout-basic', component: LayoutBasicComponent },

  { selector: 'website-tiny-layout-basic-simple', component: LayoutBasicSimpleComponent },

  { selector: 'website-tiny-layout-basic-simple-responsive', component: LayoutBasicSimpleResponsiveComponent },

  { selector: 'website-tiny-layout-overview', component: LayoutOverviewComponent },

  { selector: 'website-tiny-layout-single', component: LayoutSingleComponent },

  { selector: 'website-tiny-layout-multi-column', component: LayoutMultiColumnComponent },

  { selector: 'website-tiny-leftmenu-no-router', component: LeftmenuNoRouterWebsiteViewComponent },

  { selector: 'website-tiny-leftmenu-basic', component: LeftmenuBasicWebsiteViewComponent },

  { selector: 'website-tiny-leftmenu-dividing', component: LeftmenuDividingWebsiteViewComponent },

  { selector: 'website-tiny-leftmenu-foot', component: LeftmenuFootWebsiteViewComponent },

  { selector: 'website-tiny-leftmenu-group', component: LeftmenuGroupWebsiteViewComponent },

  { selector: 'website-tiny-leftmenu-href', component: LeftmenuHrefWebsiteViewComponent },

  { selector: 'website-tiny-leftmenu-params', component: LeftmenuParamsWebsiteViewComponent },

  { selector: 'website-tiny-leftmenu-routerlist', component: LeftmenuRouterlistWebsiteViewComponent },

  { selector: 'website-tiny-leftmenu-scroll', component: LeftmenuScrollComponent },

  { selector: 'website-tiny-leftmenu-security', component: LeftmenuSecurityComponent },

  { selector: 'website-tiny-leftmenu-reload-state', component: LeftmenuReloadStateWebsiteViewComponent },

  { selector: 'website-tiny-leftmenu-collapsed', component: LeftmenuCollapsedWebsiteViewComponent },

  { selector: 'website-tiny-leftmenu-toggleable', component: LeftmenuToggleableWebsiteViewComponent },

  { selector: 'website-tiny-leftmenu-disabled', component: LeftmenuDisabledWebsiteViewComponent },

  { selector: 'website-tiny-leftmenu-active-change', component: LeftmenuActiveChangeWebsiteViewComponent },

  { selector: 'website-tiny-link-navigation', component: LinkNavigationComponent },

  { selector: 'website-tiny-link-richtext', component: LinkRichtextComponent },

  { selector: 'website-tiny-loading-basic', component: LoadingBasicComponent },

  { selector: 'website-tiny-loading-size', component: LoadingSizeComponent },

  { selector: 'website-tiny-loading-type', component: LoadingTypeComponent },

  { selector: 'website-tiny-locale-basic', component: LocaleBasicComponent },

  { selector: 'website-tiny-locale-format', component: LocaleFormatComponent },

  { selector: 'website-tiny-locale-reload', component: LocaleReloadComponent },

  { selector: 'website-tiny-log-usage', component: LogUsageComponent },

  { selector: 'website-tiny-menu-beforeopen', component: MenuBeforeopenComponent },

  { selector: 'website-tiny-menu-border', component: MenuBorderComponent },

  { selector: 'website-tiny-menu-basic', component: MenuBasicComponent },

  { selector: 'website-tiny-menu-disabled', component: MenuDisabledComponent },

  { selector: 'website-tiny-menu-group', component: MenuGroupComponent },

  { selector: 'website-tiny-menu-id', component: MenuIdComponent },

  { selector: 'website-tiny-menu-panelalign', component: MenuPanelalignComponent },

  { selector: 'website-tiny-menu-panelstyle', component: MenuPanelstyleComponent },

  { selector: 'website-tiny-menu-tips', component: MenuTipsComponent },

  { selector: 'website-tiny-menu-labelkey', component: MenuLabelkeyComponent },

  { selector: 'website-tiny-menu-buttoncolor', component: MenuButtoncolorComponent },

  { selector: 'website-tiny-menu-templete', component: MenuTempleteComponent },

  { selector: 'website-tiny-menu-event', component: MenuEventComponent },

  { selector: 'website-tiny-message-basic', component: MessageBasicComponent },

  { selector: 'website-tiny-message-btn', component: MessageBtnComponent },

  { selector: 'website-tiny-message-btn-test', component: MessageBtnTestComponent },

  { selector: 'website-tiny-message-content', component: MessageContentComponent },

  { selector: 'website-tiny-message-id', component: MessageIdComponent },

  { selector: 'website-tiny-message-security', component: MessageSecurityComponent },

  { selector: 'website-tiny-message-title', component: MessageTitleComponent },

  { selector: 'website-tiny-message-type', component: MessageTypeComponent },

  { selector: 'website-tiny-modal-class', component: ModalClassComponent },

  { selector: 'website-tiny-modal-config-test', component: ModalConfigTestComponent },

  { selector: 'website-tiny-modal-content-comp', component: ModalContentCompComponent },

  { selector: 'website-tiny-modal-content-temp', component: ModalContentTempComponent },

  { selector: 'website-tiny-modal-event', component: ModalEventComponent },

  { selector: 'website-tiny-modal-header-style', component: ModalHeaderStyleComponent },

  { selector: 'website-tiny-modal-two-backdrop', component: ModalTwoBackdropComponent },

  { selector: 'website-tiny-modal-two-test', component: ModalTwoTestComponent },

  { selector: 'website-tiny-modal-animation', component: ModalAnimationComponent },

  { selector: 'website-tiny-modal-backdrop', component: ModalBackdropComponent },

  { selector: 'website-tiny-modal-close-icon', component: ModalCloseIconComponent },

  { selector: 'website-tiny-modal-draggable', component: ModalDraggableComponent },

  { selector: 'website-tiny-modal-esc', component: ModalEscComponent },

  { selector: 'website-tiny-modal-header-align', component: ModalHeaderAlignComponent },

  { selector: 'website-tiny-nav-active', component: NavActiveComponent },

  { selector: 'website-tiny-nav-align', component: NavAlignComponent },

  { selector: 'website-tiny-nav-basic', component: NavBasicComponent },

  { selector: 'website-tiny-nav-disabled', component: NavDisabledComponent },

  { selector: 'website-tiny-nav-event', component: NavEventComponent },

  { selector: 'website-tiny-nav-left', component: NavLeftComponent },

  { selector: 'website-tiny-nav-template', component: NavTemplateComponent },

  { selector: 'website-tiny-nav-right', component: NavRightComponent },

  { selector: 'website-tiny-nav-selectable', component: NavSelectableComponent },

  { selector: 'website-tiny-nav-submenu', component: NavSubmenuComponent },

  { selector: 'website-tiny-nav-theme', component: NavThemeComponent },

  { selector: 'website-tiny-nav-width', component: NavWidthComponent },

  { selector: 'website-tiny-notification-animation', component: NotificationAnimationComponent },

  { selector: 'website-tiny-notification-basic', component: NotificationBasicComponent },

  { selector: 'website-tiny-notification-close', component: NotificationCloseComponent },

  { selector: 'website-tiny-notification-duration', component: NotificationDurationComponent },

  { selector: 'website-tiny-notification-events', component: NotificationEventsComponent },

  { selector: 'website-tiny-notification-hover-pause', component: NotificationHoverPauseComponent },

  { selector: 'website-tiny-notification-name', component: NotificationNameComponent },

  { selector: 'website-tiny-notification-position', component: NotificationPositionComponent },

  { selector: 'website-tiny-notification-template', component: NotificationTemplateComponent },

  { selector: 'website-tiny-notification-type', component: NotificationTypeComponent },

  { selector: 'website-tiny-overflow-maxline', component: OverflowMaxlineComponent },

  { selector: 'website-tiny-overflow-maxwidth', component: OverflowMaxwidthComponent },

  { selector: 'website-tiny-overflow-tipcontent', component: OverflowTipcontentComponent },

  { selector: 'website-tiny-overflow-position', component: OverflowPositionComponent },

  { selector: 'website-tiny-pagination-autohide', component: PaginationAutohideComponent },

  { selector: 'website-tiny-pagination-disabled', component: PaginationDisabledComponent },

  { selector: 'website-tiny-pagination-event', component: PaginationEventComponent },

  { selector: 'website-tiny-pagination-fixed', component: PaginationFixedComponent },

  { selector: 'website-tiny-pagination-pagesize', component: PaginationPagesizeComponent },

  { selector: 'website-tiny-pagination-showlastpage', component: PaginationShowlastpageComponent },

  { selector: 'website-tiny-pagination-showgotolink', component: PaginationShowgotolinkComponent },

 { selector: 'website-tiny-pagination-pageselectwidth', component: PaginationPageselectwidthComponent },

  { selector: 'website-tiny-pagination-showtotalnumber', component: PaginationShowtotalnumberComponent },

  { selector: 'website-tiny-pagination-type', component: PaginationTypeComponent },

  { selector: 'website-tiny-popconfirm-basic', component: PopconfirmBasicComponent },

  { selector: 'website-tiny-popconfirm-define', component: PopconfirmDefineComponent },

  { selector: 'website-tiny-popconfirm-event', component: PopconfirmEventComponent },

  { selector: 'website-tiny-popconfirm-table', component: PopconfirmTableComponent },

  { selector: 'website-tiny-popconfirm-table-define', component: PopconfirmTableDefineComponent },

  { selector: 'website-tiny-progressbar-animation', component: ProgressbarAnimationComponent },

  { selector: 'website-tiny-progressbar-basic', component: ProgressbarBasicComponent },

  { selector: 'website-tiny-progressbar-class', component: ProgressbarClassComponent },

  { selector: 'website-tiny-radio-basic', component: RadioBasicComponent },

  { selector: 'website-tiny-radio-dark', component: RadioDarkComponent },

  { selector: 'website-tiny-radio-disabled', component: RadioDisabledComponent },

  { selector: 'website-tiny-radio-event', component: RadioEventComponent },

  { selector: 'website-tiny-radio-focus', component: RadioFocusComponent },

  { selector: 'website-tiny-radio-label', component: RadioLabelComponent },

  { selector: 'website-tiny-radiogroup-basic', component: RadiogroupBasicComponent },

  { selector: 'website-tiny-radiogroup-define', component: RadiogroupDefineComponent },

  { selector: 'website-tiny-radiogroup-direction', component: RadiogroupDirectionComponent },

  { selector: 'website-tiny-radiogroup-style', component: RadiogroupStyleComponent },

  { selector: 'website-tiny-radiogroup-labelkey', component: RadiogroupLabelkeyComponent },

  { selector: 'website-tiny-radiogroup-valuekey', component: RadiogroupValuekeyComponent },

  { selector: 'website-tiny-radiogroup-validation', component: RadiogroupValidationComponent },

  { selector: 'website-tiny-radiogroup-reactive-validation', component: RadiogroupReactiveValidationComponent },

  { selector: 'website-tiny-rate-basic', component: RateBasicComponent },

  { selector: 'website-tiny-rate-disabled', component: RateDisabledComponent },

  { selector: 'website-tiny-rate-event', component: RateEventComponent },

  { selector: 'website-tiny-searchbox-appendtobody', component: SearchboxAppendtobodyComponent },

  { selector: 'website-tiny-searchbox-basic', component: SearchboxBasicComponent },

  { selector: 'website-tiny-searchbox-template', component: SearchboxTemplateComponent },

  { selector: 'website-tiny-searchbox-disabled', component: SearchboxDisabledComponent },

  { selector: 'website-tiny-searchbox-event', component: SearchboxEventComponent },

  { selector: 'website-tiny-searchbox-notsearch', component: SearchboxNotsearchComponent },

  { selector: 'website-tiny-searchbox-panelsize', component: SearchboxPanelsizeComponent },

  { selector: 'website-tiny-searchbox-suggest', component: SearchboxSuggestComponent },

  { selector: 'website-tiny-searchbox-reactive', component: SearchboxReactiveComponent },

  { selector: 'website-tiny-searchbox-options', component: SearchboxOptionsComponent },

  { selector: 'website-tiny-searchbox-maxlength', component: SearchboxMaxlengthComponent },

  { selector: 'website-tiny-searchbox-test', component: SearchboxTestComponent },

  { selector: 'website-tiny-searchbox-trimmed', component: SearchboxTrimmedComponent },

  { selector: 'website-tiny-searchbox-valid', component: SearchboxValidComponent },

  { selector: 'website-tiny-select-appendtobody', component: SelectAppendtobodyComponent },

  { selector: 'website-tiny-select-basic', component: SelectBasicComponent },

  { selector: 'website-tiny-select-beforesearch', component: SelectBeforesearchComponent },

  { selector: 'website-tiny-select-change-selectall', component: SelectChangeSelectallComponent },

  { selector: 'website-tiny-select-clearable', component: SelectClearableComponent },

  { selector: 'website-tiny-select-disabled', component: SelectDisabledComponent },

  { selector: 'website-tiny-select-disabledfocus', component: SelectDisabledfocusComponent },

  { selector: 'website-tiny-select-enum', component: SelectEnumComponent },

  { selector: 'website-tiny-select-event', component: SelectEventComponent },

  { selector: 'website-tiny-select-focus', component: SelectFocusComponent },

  { selector: 'website-tiny-select-group', component: SelectGroupComponent },

  { selector: 'website-tiny-select-id', component: SelectIdComponent },

  { selector: 'website-tiny-select-idkey', component: SelectIdkeyComponent },

  { selector: 'website-tiny-select-input', component: SelectInputComponent },

  { selector: 'website-tiny-select-lazy', component: SelectLazyComponent },

  { selector: 'website-tiny-select-leak', component: SelectLeakComponent },

  { selector: 'website-tiny-select-load', component: SelectLoadComponent },

  { selector: 'website-tiny-select-many', component: SelectManyComponent },

  { selector: 'website-tiny-select-maxline', component: SelectMaxlineComponent },

  { selector: 'website-tiny-select-much', component: SelectMuchComponent },

  { selector: 'website-tiny-select-showselectednumber', component: SelectShowselectednumberComponent },

  { selector: 'website-tiny-select-multi', component: SelectMultiComponent },

  { selector: 'website-tiny-select-noborder', component: SelectNoborderComponent },

  { selector: 'website-tiny-select-nodata', component: SelectNodataComponent },

  { selector: 'website-tiny-select-noempty', component: SelectNoemptyComponent },

  { selector: 'website-tiny-select-null', component: SelectNullComponent },

  { selector: 'website-tiny-select-pagin-beforesearch', component: SelectPaginBeforesearchComponent },

  { selector: 'website-tiny-select-pagination', component: SelectPaginationComponent },

  { selector: 'website-tiny-select-panel', component: SelectPanelComponent },

  { selector: 'website-tiny-select-searchkeys', component: SelectSearchkeysComponent },

  { selector: 'website-tiny-select-reservesearchword', component: SelectReservesearchwordComponent },

  { selector: 'website-tiny-select-scroll-load', component: SelectScrollLoadComponent },

  { selector: 'website-tiny-select-search', component: SelectSearchComponent },

  { selector: 'website-tiny-select-selectall', component: SelectSelectallComponent },

  { selector: 'website-tiny-select-small', component: SelectSmallComponent },

  { selector: 'website-tiny-select-tag', component: SelectTagComponent },

  { selector: 'website-tiny-select-template', component: SelectTemplateComponent },

  { selector: 'website-tiny-select-tip', component: SelectTipComponent },

  { selector: 'website-tiny-select-tiscroll', component: SelectTiscrollComponent },

  { selector: 'website-tiny-select-tworow', component: SelectTworowComponent },

  { selector: 'website-tiny-select-valid', component: SelectValidComponent },

  { selector: 'website-tiny-select-validgroup', component: SelectValidgroupComponent },

  { selector: 'website-tiny-select-valuekey-test', component: SelectValuekeyTestComponent },

  { selector: 'website-tiny-select-valuekey', component: SelectValuekeyComponent },

  { selector: 'website-tiny-select-labelkey', component: SelectLabelkeyComponent },

  { selector: 'website-tiny-select-virtualscroll-multi', component: SelectVirtualscrollMultiComponent },

  { selector: 'website-tiny-select-virtualscroll', component: SelectVirtualscrollComponent },

  { selector: 'website-tiny-skeleton-page', component: SkeletonPageComponent },

  { selector: 'website-tiny-skeleton-title', component: SkeletonTitleComponent },

  { selector: 'website-tiny-skeleton-type', component: SkeletonTypeComponent },

  { selector: 'website-tiny-slider-event', component: SliderEventComponent },

  { selector: 'website-tiny-slider-hidden', component: SliderHiddenComponent },

  { selector: 'website-tiny-slider-limits', component: SliderLimitsComponent },

  { selector: 'website-tiny-slider-formcontrol', component: SliderFormcontrolComponent },

  { selector: 'website-tiny-slider-ratios', component: SliderRatiosComponent },

  { selector: 'website-tiny-slider-scales', component: SliderScalesComponent },

  { selector: 'website-tiny-slider-template', component: SliderTemplateComponent },

  { selector: 'website-tiny-slider-tip', component: SliderTipComponent },

  { selector: 'website-tiny-spinner-basic-test', component: SpinnerBasicTestComponent },

  { selector: 'website-tiny-spinner-basic', component: SpinnerBasicComponent },

  { selector: 'website-tiny-spinner-correctable', component: SpinnerCorrectableComponent },

  { selector: 'website-tiny-spinner-disabled', component: SpinnerDisabledComponent },

  { selector: 'website-tiny-spinner-event', component: SpinnerEventComponent },

  { selector: 'website-tiny-spinner-format', component: SpinnerFormatComponent },

  { selector: 'website-tiny-spinner-load', component: SpinnerLoadComponent },

  { selector: 'website-tiny-spinner-localeable', component: SpinnerLocaleableComponent },

  { selector: 'website-tiny-spinner-max-min', component: SpinnerMaxMinComponent },

  { selector: 'website-tiny-spinner-maxlength', component: SpinnerMaxlengthComponent },

  { selector: 'website-tiny-spinner-step', component: SpinnerStepComponent },

  { selector: 'website-tiny-spinner-stepfn', component: SpinnerStepfnComponent },

  { selector: 'website-tiny-spinner-tip', component: SpinnerTipComponent },

  { selector: 'website-tiny-spinner-validation-test', component: SpinnerValidationTestComponent },

  { selector: 'website-tiny-spinner-validation', component: SpinnerValidationComponent },

  { selector: 'website-tiny-subtitle-items', component: SubtitleItemsComponent },

  { selector: 'website-tiny-subtitle-dark', component: SubtitleDarkComponent },

  { selector: 'website-tiny-subtitle-maxwidth', component: SubtitleMaxwidthComponent },

  { selector: 'website-tiny-subtitle-panelwidth', component: SubtitlePanelwidthComponent },

  { selector: 'website-tiny-subtitle-target', component: SubtitleTargetComponent },

  { selector: 'website-tiny-subtitle-searchable', component: SubtitleSearchableComponent },

  { selector: 'website-tiny-subtitle-idkey', component: SubtitleIdkeyComponent },

  { selector: 'website-tiny-subtitle-scroll-load', component: SubtitleScrollLoadComponent },

  { selector: 'website-tiny-subtitle-tip-position', component: SubtitleTipPositionComponent },

  { selector: 'website-tiny-subtitle-before-search', component: SubtitleBeforeSearchComponent },

  { selector: 'website-tiny-subtitle-event', component: SubtitleEventComponent },

  { selector: 'website-tiny-steps-active', component: StepsActiveComponent },

  { selector: 'website-tiny-steps-adaptive-test', component: StepsAdaptiveTestComponent },

  { selector: 'website-tiny-steps-adaptive', component: StepsAdaptiveComponent },

  { selector: 'website-tiny-steps-base', component: StepsBaseComponent },

  { selector: 'website-tiny-steps-before', component: StepsBeforeComponent },

  { selector: 'website-tiny-steps-clickable', component: StepsClickableComponent },

  { selector: 'website-tiny-steps-label', component: StepsLabelComponent },

  { selector: 'website-tiny-steps-maxwidth', component: StepsMaxwidthComponent },

  { selector: 'website-tiny-steps-template', component: StepsTemplateComponent },

  { selector: 'website-tiny-steps-events', component: StepsEventsComponent },

  { selector: 'website-tiny-switch-basic', component: SwitchBasicComponent },

  { selector: 'website-tiny-switch-before', component: SwitchBeforeComponent },

  { selector: 'website-tiny-switch-disabled', component: SwitchDisabledComponent },

  { selector: 'website-tiny-switch-event', component: SwitchEventComponent },

  { selector: 'website-tiny-switch-explanation', component: SwitchExplanationComponent },

  { selector: 'website-tiny-switch-template', component: SwitchTemplateComponent },

  { selector: 'website-tiny-switch-focus', component: SwitchFocusComponent },

  { selector: 'website-tiny-switch-id', component: SwitchIdComponent },

  { selector: 'website-tiny-switch-load', component: SwitchLoadComponent },

  { selector: 'website-tiny-swiper-basic', component: SwiperBasicComponent },
  { selector: 'website-tiny-swiper-showcardnum', component: SwiperShowcardnumComponent },
  { selector: 'website-tiny-swiper-activeindex', component: SwiperActiveindexComponent },
  { selector: 'website-tiny-swiper-events', component: SwiperEventsComponent },
  { selector: 'website-tiny-swiper-autoplay', component: SwiperAutoplayComponent },
  { selector: 'website-tiny-swiper-loop', component: SwiperLoopComponent },
  { selector: 'website-tiny-swiper-indicatorposition', component: SwiperIndicatorpositionComponent },

  { selector: 'website-tiny-tab-basic', component: TabBasicComponent },

  { selector: 'website-tiny-tab-beforeactivechange', component: TabBeforeactivechangeComponent },

  { selector: 'website-tiny-tab-content-comp', component: TabContentCompComponent },

  { selector: 'website-tiny-tab-custom-head', component: TabCustomHeadComponent },

  { selector: 'website-tiny-tab-default-test', component: TabDefaultTestComponent },

  { selector: 'website-tiny-tab-lazy-load', component: TabLazyLoadComponent },

  { selector: 'website-tiny-tab-level2-test', component: TabLevel2TestComponent },

  { selector: 'website-tiny-tab-level2', component: TabLevel2Component },

  { selector: 'website-tiny-tab-overflow', component: TabOverflowComponent },

  { selector: 'website-tiny-tab-scroll', component: TabScrollComponent },

  { selector: 'website-tiny-tab-small', component: TabSmallComponent },

  { selector: 'website-tiny-tab-dark', component: TabDarkComponent },

  { selector: 'website-tiny-tab-route', component: TabRouteComponent },

  { selector: 'website-tiny-table-actionmenu', component: TableActionmenuComponent },

 { selector: 'website-tiny-table-basic-test', component: TableBasicTestComponent },

 { selector: 'website-tiny-table-basic', component: TableBasicComponent },

  { selector: 'website-tiny-table-cell-tip', component: TableCellTipComponent },

  { selector: 'website-tiny-table-cellicons-colsresizable', component: TableCelliconsColsresizableComponent },

  { selector: 'website-tiny-table-checkbox-pagination-headmenu', component: TableCheckboxPaginationHeadmenuComponent },

  { selector: 'website-tiny-table-checkbox-pagination', component: TableCheckboxPaginationComponent },

  { selector: 'website-tiny-table-checkbox', component: TableCheckboxComponent },

  { selector: 'website-tiny-table-col-align', component: TableColAlignComponent },

  { selector: 'website-tiny-table-colalign-sort-resizable-test', component: TableColalignSortResizableTestComponent },

 { selector: 'website-tiny-table-colsresizable-basic', component: TableColsresizableBasicComponent },

 { selector: 'website-tiny-table-cols-resizable', component: TableColsResizableComponent },

  { selector: 'website-tiny-table-cols-toggle-details', component: TableColsToggleDetailsComponent },

 { selector: 'website-tiny-table-cols-toggle-test', component: TableColsToggleTestComponent },

 { selector: 'website-tiny-table-cols-toggle', component: TableColsToggleComponent },

  { selector: 'website-tiny-table-colsresizable-colstoggle-fixedhead', component: TableColsresizableColstoggleFixedheadComponent },

  { selector: 'website-tiny-table-colsresizable-colstoggle', component: TableColsresizableColstoggleComponent },

  { selector: 'website-tiny-table-colsresizable-loadfail', component: TableColsresizableLoadfailComponent },

  { selector: 'website-tiny-table-colsresizable-sort-headfilter', component: TableColsresizableSortHeadfilterComponent },

  { selector: 'website-tiny-table-colsresizable-sort', component: TableColsresizableSortComponent },

  { selector: 'website-tiny-table-column-fixed', component: TableColumnFixedComponent },

  { selector: 'website-tiny-table-columnfixed-checkbox', component: TableColumnfixedCheckboxComponent },

  { selector: 'website-tiny-table-columnfixed-colstoggle', component: TableColumnfixedColstoggleComponent },

  { selector: 'website-tiny-table-columnfixed-editrow', component: TableColumnfixedEditrowComponent },

  { selector: 'website-tiny-table-columnfixed-fixedhead-colsresizable-pagination', component: TableColumnfixedFixedheadColsresizablePaginationComponent },

  { selector: 'website-tiny-table-columnfixed-headfixed', component: TableColumnfixedHeadfixedComponent },

  { selector: 'website-tiny-table-columnfixed-leftmenu', component: TableColumnfixedLeftmenuComponent },

  { selector: 'website-tiny-table-columnfixed-nodata', component: TableColumnfixedNodataComponent },

  { selector: 'website-tiny-table-columnfixed-pagination', component: TableColumnfixedPaginationComponent },

  { selector: 'website-tiny-table-columnfixed-resizable', component: TableColumnfixedResizableComponent },

  { selector: 'website-tiny-table-comprehensive', component: TableComprehensiveComponent },

  { selector: 'website-tiny-table-details-closeotherdetails', component: TableDetailsCloseotherdetailsComponent },

  { selector: 'website-tiny-table-details-nesttable', component: TableDetailsNesttableComponent },

  { selector: 'website-tiny-table-details-pagination', component: TableDetailsPaginationComponent },

  { selector: 'website-tiny-table-details', component: TableDetailsComponent },

  { selector: 'website-tiny-table-dynamic-details', component: TableDynamicDetailsComponent },

 { selector: 'website-tiny-table-editall-test', component: TableEditallTestComponent },

 { selector: 'website-tiny-table-editall', component: TableEditallComponent },

 { selector: 'website-tiny-table-editrow-test', component: TableEditrowTestComponent },

 { selector: 'website-tiny-table-editrow', component: TableEditrowComponent },

  { selector: 'website-tiny-table-filter-strict', component: TableFilterStrictComponent },

  { selector: 'website-tiny-table-filter', component: TableFilterComponent },

  { selector: 'website-tiny-table-fixed-head-cols-resizable', component: TableFixedHeadColsResizableComponent },

  { selector: 'website-tiny-table-fixed-head-in-accordion', component: TableFixedHeadInAccordionComponent },

  { selector: 'website-tiny-table-fixed-head-nodata', component: TableFixedHeadNodataComponent },

  { selector: 'website-tiny-table-fixed-head-pagination-details', component: TableFixedHeadPaginationDetailsComponent },

  { selector: 'website-tiny-table-fixed-head', component: TableFixedHeadComponent },

  { selector: 'website-tiny-table-fixedhead-colsresizable-pagination-details', component: TableFixedheadColsresizablePaginationDetailsComponent },

  { selector: 'website-tiny-table-fixhead-scroll', component: TableFixheadScrollComponent },

  { selector: 'website-tiny-table-group', component: TableGroupComponent },

  { selector: 'website-tiny-table-guide', component: TableGuideComponent },

 { selector: 'website-tiny-table-head-filter-datetime-test', component: TableHeadFilterDatetimeTestComponent },

 { selector: 'website-tiny-table-head-filter-datetime', component: TableHeadFilterDatetimeComponent },

  { selector: 'website-tiny-table-head-filter-multi-valuekey', component: TableHeadFilterMultiValuekeyComponent },

  { selector: 'website-tiny-table-head-filter-multi', component: TableHeadFilterMultiComponent },

  { selector: 'website-tiny-table-head-filter-valuekey', component: TableHeadFilterValuekeyComponent },

  { selector: 'website-tiny-table-head-filter-virtualscroll', component: TableHeadFilterVirtualscrollComponent },

  { selector: 'website-tiny-table-head-filter', component: TableHeadFilterComponent },

 { selector: 'website-tiny-table-head-filter-test', component: TableHeadFilterTestComponent },

 { selector: 'website-tiny-table-load-fail', component: TableLoadFailComponent },

  { selector: 'website-tiny-table-nodata-simple', component: TableNodataSimpleComponent },

  { selector: 'website-tiny-table-nodata', component: TableNodataComponent },

 { selector: 'website-tiny-table-nodata-test', component: TableNodataTestComponent },

 { selector: 'website-tiny-table-overflow-link', component: TableOverflowLinkComponent },

  { selector: 'website-tiny-table-pagi-with-filter', component: TablePagiWithFilterComponent },

  { selector: 'website-tiny-table-pagination', component: TablePaginationComponent },

 { selector: 'website-tiny-table-radio-test', component: TableRadioTestComponent },

 { selector: 'website-tiny-table-radio', component: TableRadioComponent },

  { selector: 'website-tiny-table-row-drag2', component: TableRowDrag2Component },

  { selector: 'website-tiny-table-rowspan', component: TableRowspanComponent },

 { selector: 'website-tiny-table-search', component: TableSearchComponent },

 { selector: 'website-tiny-table-server-pagi-search-sort', component: TableServerPagiSearchSortComponent },

  { selector: 'website-tiny-table-server-pagi', component: TableServerPagiComponent },

  { selector: 'website-tiny-table-small', component: TableSmallComponent },

  { selector: 'website-tiny-table-soldout', component: TableSoldoutComponent },

  { selector: 'website-tiny-table-sort-comparefn-locale', component: TableSortComparefnLocaleComponent },

  { selector: 'website-tiny-table-sort-comparefn', component: TableSortComparefnComponent },

  { selector: 'website-tiny-table-sort-details', component: TableSortDetailsComponent },

  { selector: 'website-tiny-table-sort-test', component: TableSortTestComponent },

 { selector: 'website-tiny-table-sort-basic', component: TableSortBasicComponent },

 { selector: 'website-tiny-table-sort', component: TableSortComponent },

 { selector: 'website-tiny-table-sort-reset', component: TableSortResetComponent },

 { selector: 'website-tiny-table-storage-config', component: TableStorageConfigComponent },

  { selector: 'website-tiny-table-storage-filter', component: TableStorageFilterComponent },

  { selector: 'website-tiny-table-storage-serve', component: TableStorageServeComponent },

  { selector: 'website-tiny-table-storage', component: TableStorageComponent },

  { selector: 'website-tiny-table-tree-mulitiselect', component: TableTreeMulitiselectComponent },

  { selector: 'website-tiny-table-tree-unknowdeepth', component: TableTreeUnknowdeepthComponent },

  { selector: 'website-tiny-table-tree', component: TableTreeComponent },

  { selector: 'website-tiny-table-virtualscroll-basic', component: TableVirtualscrollBasicComponent },

  { selector: 'website-tiny-table-virtualscroll-comprehensive', component: TableVirtualscrollComprehensiveComponent },

  { selector: 'website-tiny-table-virtualscroll-sizes', component: TableVirtualscrollSizesComponent },

  { selector: 'website-tiny-table-virtualscroll-tree', component: TableVirtualscrollTreeComponent },

  { selector: 'website-tiny-table-virtualscroll', component: TableVirtualscrollComponent },

  { selector: 'website-tiny-tag-default', component: TagDefaultComponent },

  { selector: 'website-tiny-tag-basic', component: TagBasicComponent },

  { selector: 'website-tiny-tag-disabled', component: TagDisabledComponent },

  { selector: 'website-tiny-tag-edit', component: TagEditComponent },

  { selector: 'website-tiny-tagsinput-basic', component: TagsinputBasicComponent },

  { selector: 'website-tiny-tagsinput-disabled', component: TagsinputDisabledComponent },

  { selector: 'website-tiny-tagsinput-events', component: TagsinputEventsComponent },

  { selector: 'website-tiny-tagsinput-labelkey', component: TagsinputLabelkeyComponent },

  { selector: 'website-tiny-tagsinput-null', component: TagsinputNullComponent },

  { selector: 'website-tiny-tagsinput-panelwidth', component: TagsinputPanelwidthComponent },

  { selector: 'website-tiny-tagsinput-suggestion', component: TagsinputSuggestionComponent },

  { selector: 'website-tiny-tagsinput-valid', component: TagsinputValidComponent },

  { selector: 'website-tiny-tagsinput-valuekey', component: TagsinputValuekeyComponent },

  { selector: 'website-tiny-tagsinput-reactive', component: TagsinputReactiveComponent },

  { selector: 'website-tiny-tagsinput-template', component: TagsinputTemplateComponent },

  { selector: 'website-tiny-text-basic', component: TextBasicComponent },

  { selector: 'website-tiny-text-clear', component: TextClearComponent },

  { selector: 'website-tiny-text-disabled', component: TextDisabledComponent },

  { selector: 'website-tiny-text-events', component: TextEventsComponent },

  { selector: 'website-tiny-text-focus', component: TextFocusComponent },

  { selector: 'website-tiny-text-noborder-test', component: TextNoborderTestComponent },

  { selector: 'website-tiny-text-password', component: TextPasswordComponent },

  { selector: 'website-tiny-text-password-visible', component: TextPasswordVisibleComponent },

  { selector: 'website-tiny-text-readonly', component: TextReadonlyComponent },

  { selector: 'website-tiny-text-reactive', component: TextReactiveComponent },

  { selector: 'website-tiny-text-maskinput', component: TextMaskinputComponent },

  { selector: 'website-tiny-textarea-autofocus', component: TextareaAutofocusComponent },

  { selector: 'website-tiny-textarea-disabled', component: TextareaDisabledComponent },

  { selector: 'website-tiny-textarea-maxlength', component: TextareaMaxlengthComponent },

  { selector: 'website-tiny-textarea-none', component: TextareaNoneComponent },

  { selector: 'website-tiny-textarea-resize', component: TextareaResizeComponent },

  { selector: 'website-tiny-textarea-scroll', component: TextareaScrollComponent },

  { selector: 'website-tiny-textarea-valid', component: TextareaValidComponent },

  { selector: 'website-tiny-textarea-width', component: TextareaWidthComponent },

  { selector: 'website-tiny-theme-basic', component: ThemeBasicComponent },

  { selector: 'website-tiny-time-clearicon', component: TimeCleariconComponent },

  { selector: 'website-tiny-time-event', component: TimeEventComponent },

  { selector: 'website-tiny-time-format', component: TimeFormatComponent },

  { selector: 'website-tiny-time-maxmin', component: TimeMaxminComponent },

  { selector: 'website-tiny-time-reactive', component: TimeReactiveComponent },

  { selector: 'website-tiny-time-option-disabled', component: TimeOptionDisabledComponent },

  { selector: 'website-tiny-time-panelalign', component: TimePanelalignComponent },

  { selector: 'website-tiny-time-validation', component: TimeValidationComponent },

  { selector: 'website-tiny-tip-basic', component: TipBasicComponent },

  { selector: 'website-tiny-tip-content-comp', component: TipContentCompComponent },

  { selector: 'website-tiny-tip-content-template', component: TipContentTemplateComponent },

  { selector: 'website-tiny-tip-has-arrow', component: TipHasArrowComponent },

  { selector: 'website-tiny-tip-max-width', component: TipMaxWidthComponent },

  { selector: 'website-tiny-tip-position', component: TipPositionComponent },

  { selector: 'website-tiny-tip-service', component: TipServiceComponent },

  { selector: 'website-tiny-tip-trigger', component: TipTriggerComponent },

  { selector: 'website-tiny-tip-zindex', component: TipZindexComponent },

  { selector: 'website-tiny-transfer-basic', component: TransferBasicComponent },

  { selector: 'website-tiny-transfer-lazy', component: TransferLazyComponent },

  { selector: 'website-tiny-transfer-size', component: TransferSizeComponent },

  { selector: 'website-tiny-transfer-labelkey', component: TransferLabelkeyComponent },

  { selector: 'website-tiny-transfer-nodatatext', component: TransferNodatatextComponent },

  { selector: 'website-tiny-transfer-event', component: TransferEventComponent },

  { selector: 'website-tiny-transfer-titles', component: TransferTitlesComponent },

  { selector: 'website-tiny-transfer-disabled', component: TransferDisabledComponent },

  { selector: 'website-tiny-transfer-load', component: TransferLoadComponent },

  { selector: 'website-tiny-transfer-searchable', component: TransferSearchableComponent },

  { selector: 'website-tiny-transfer-searchkeys', component: TransferSearchkeysComponent },

  { selector: 'website-tiny-transfer-placeholder', component: TransferPlaceholderComponent },

  { selector: 'website-tiny-transfer-idkey', component: TransferIdkeyComponent },

  { selector: 'website-tiny-transfer-pagination', component: TransferPaginationComponent },

  { selector: 'website-tiny-transfer-table', component: TransferTableComponent },

  { selector: 'website-tiny-tree-before-expand', component: TreeBeforeExpandComponent },

  { selector: 'website-tiny-tree-before-more', component: TreeBeforeMoreComponent },

  { selector: 'website-tiny-tree-changedbycheckbox', component: TreeChangedbycheckboxComponent },

  { selector: 'website-tiny-tree-check-relation', component: TreeCheckRelationComponent },

  { selector: 'website-tiny-tree-disabled', component: TreeDisabledComponent },

  { selector: 'website-tiny-tree-drag-beforedrop', component: TreeDragBeforedropComponent },

  { selector: 'website-tiny-tree-drag', component: TreeDragComponent },

  { selector: 'website-tiny-tree-event', component: TreeEventComponent },

  { selector: 'website-tiny-tree-icon', component: TreeIconComponent },

  { selector: 'website-tiny-tree-load', component: TreeLoadComponent },

  { selector: 'website-tiny-tree-many', component: TreeManyComponent },

  { selector: 'website-tiny-tree-multiselect', component: TreeMultiselectComponent },

  { selector: 'website-tiny-tree-operate', component: TreeOperateComponent },

  { selector: 'website-tiny-tree-parentcheckable', component: TreeParentcheckableComponent },

  { selector: 'website-tiny-tree-radioselect', component: TreeRadioselectComponent },

  { selector: 'website-tiny-tree-search', component: TreeSearchComponent },

  { selector: 'website-tiny-tree-shortcutkey', component: TreeShortcutkeyComponent },

  { selector: 'website-tiny-tree-small', component: TreeSmallComponent },

  { selector: 'website-tiny-tree-template', component: TreeTemplateComponent },

  { selector: 'website-tiny-tree-util', component: TreeUtilComponent },

  { selector: 'website-tiny-tree-virtualscroll-drag', component: TreeVirtualscrollDragComponent },

  { selector: 'website-tiny-tree-virtualscroll-small', component: TreeVirtualscrollSmallComponent },

  { selector: 'website-tiny-tree-virtualscroll', component: TreeVirtualscrollComponent },

  { selector: 'website-tiny-treeselect-basic', component: TreeselectBasicComponent },

  { selector: 'website-tiny-treeselect-multi', component: TreeselectMultiComponent },

  { selector: 'website-tiny-treeselect-before-expand', component: TreeselectBeforeExpandComponent },

  { selector: 'website-tiny-treeselect-before-more', component: TreeselectBeforeMoreComponent },

  { selector: 'website-tiny-treeselect-clearable', component: TreeselectClearableComponent },

  { selector: 'website-tiny-treeselect-disabled', component: TreeselectDisabledComponent },

  { selector: 'website-tiny-treeselect-dropmaxheight', component: TreeselectDropmaxheightComponent },

  { selector: 'website-tiny-treeselect-event', component: TreeselectEventComponent },

  { selector: 'website-tiny-treeselect-focus', component: TreeselectFocusComponent },

  { selector: 'website-tiny-treeselect-maxline', component: TreeselectMaxlineComponent },

  { selector: 'website-tiny-treeselect-panelwidth', component: TreeselectPanelwidthComponent },

  { selector: 'website-tiny-treeselect-lazyload', component: TreeselectLazyloadComponent },

  { selector: 'website-tiny-treeselect-load', component: TreeselectLoadComponent },

  { selector: 'website-tiny-treeselect-modal', component: TreeselectModalComponent },

  { selector: 'website-tiny-treeselect-nodata', component: TreeselectNodataComponent },

  { selector: 'website-tiny-treeselect-options-change', component: TreeselectOptionsChangeComponent },

  { selector: 'website-tiny-treeselect-search', component: TreeselectSearchComponent },

  { selector: 'website-tiny-treeselect-selectall', component: TreeselectSelectallComponent },

  { selector: 'website-tiny-treeselect-validation', component: TreeselectValidationComponent },

  { selector: 'website-tiny-treeselect-labelkey', component: TreeselectLabelkeyComponent },

  { selector: 'website-tiny-upload-auto-upload', component: UploadAutoUploadComponent },

  { selector: 'website-tiny-upload-basic', component: UploadBasicComponent },

  { selector: 'website-tiny-upload-batch-send', component: UploadBatchSendComponent },

  { selector: 'website-tiny-upload-beforeremove', component: UploadBeforeremoveComponent },

  { selector: 'website-tiny-upload-button-test', component: UploadButtonTestComponent },

  { selector: 'website-tiny-upload-button', component: UploadButtonComponent },

  { selector: 'website-tiny-upload-props', component: UploadPropsComponent },

  { selector: 'website-tiny-upload-case-test', component: UploadCaseTestComponent },

  { selector: 'website-tiny-upload-changes', component: UploadChangesComponent },

  { selector: 'website-tiny-upload-event', component: UploadEventComponent },

  { selector: 'website-tiny-upload-filter', component: UploadFilterComponent },

  { selector: 'website-tiny-upload-form-data', component: UploadFormDataComponent },

  { selector: 'website-tiny-upload-input-field-test', component: UploadInputFieldTestComponent },

  { selector: 'website-tiny-upload-service-test', component: UploadServiceTestComponent },

  { selector: 'website-tiny-upload-service', component: UploadServiceComponent },

  { selector: 'website-tiny-upload-single', component: UploadSingleComponent },

  { selector: 'website-tiny-upload-custom', component: UploadCustomComponent },

  { selector: 'website-tiny-uploadimage-basic', component: UploadimageBasicComponent },

  { selector: 'website-tiny-uploadimage-auto-upload', component: UploadimageAutoUploadComponent },

  { selector: 'website-tiny-uploadimage-changes', component: UploadimageChangesComponent },

  { selector: 'website-tiny-uploadimage-deletable', component: UploadimageDeletableComponent },

  { selector: 'website-tiny-uploadimage-disabled', component: UploadimageDisabledComponent },

  { selector: 'website-tiny-uploadimage-drag', component: UploadimageDragComponent },

  { selector: 'website-tiny-uploadimage-event', component: UploadimageEventComponent },

  { selector: 'website-tiny-uploadimage-filter', component: UploadimageFilterComponent },

  { selector: 'website-tiny-uploadimage-initfiles', component: UploadimageInitfilesComponent },

  { selector: 'website-tiny-uploadimage-maxcount', component: UploadimageMaxcountComponent },

  { selector: 'website-tiny-uploadimage-template', component: UploadimageTemplateComponent },

  { selector: 'website-tiny-browser-basic', component: BrowserBasicComponent },

  { selector: 'website-tiny-keymap-basic', component: KeymapBasicComponent },

  { selector: 'website-tiny-log-basic', component: LogBasicComponent },

  { selector: 'website-tiny-validation-async-check-test', component: ValidationAsyncCheckTestComponent },

  { selector: 'website-tiny-validation-async-check', component: ValidationAsyncCheckComponent },

  { selector: 'website-tiny-validation-basic-control', component: ValidationBasicControlComponent },

  { selector: 'website-tiny-validation-basic-directive', component: ValidationBasicDirectiveComponent },

  { selector: 'website-tiny-validation-blur-check', component: ValidationBlurCheckComponent },

  { selector: 'website-tiny-validation-error-msg', component: ValidationErrorMsgComponent },

  { selector: 'website-tiny-validation-form-group-config', component: ValidationFormGroupConfigComponent },

  { selector: 'website-tiny-validation-form-group-test', component: ValidationFormGroupTestComponent },

  { selector: 'website-tiny-validation-form-group', component: ValidationFormGroupComponent },

  { selector: 'website-tiny-validation-param-change', component: ValidationParamChangeComponent },

  { selector: 'website-tiny-validation-pwd-check', component: ValidationPwdCheckComponent },

  { selector: 'website-tiny-validation-rules-custom-directive', component: ValidationRulesCustomDirectiveComponent },

  { selector: 'website-tiny-validation-rules-custom', component: ValidationRulesCustomComponent },

  { selector: 'website-tiny-validation-rules-test', component: ValidationRulesTestComponent },

  { selector: 'website-tiny-validation-template-form-nested', component: ValidationTemplateFormNestedComponent },

  { selector: 'website-tiny-validation-tip', component: ValidationTipComponent },

  { selector: 'website-tiny-validation-tiscroll', component: ValidationTiscrollComponent },
]

@NgModule({
  imports: [
    DemoModules.allModules,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule // 因为modal,message,collapse,accordion组件使用了angular动画，所以需要引入此模块
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    // 国际化功能开启，测试其它语种的显示，可打开这段注释
    // 设置当前语言，默认为中文
    // TiLocale.setLocale(TiLocale.EN_US); // 设置国际化语种
    for (const item of WCS) {
      if (!customElements.get(item.selector)) {
        const el: any = createCustomElement(item.component, { injector: this.injector });
        customElements.define(item.selector, el);
      }
    }
  }

  ngDoBootstrap(): void { }
}
