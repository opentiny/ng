import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { DemoModules } from './DemoModules';
import { HttpClientModule } from '@angular/common/http';

import { AccordionBasicComponent } from './../../../../accordion/demo/src/app/accordion/AccordionBasicComponent';

import { AccordionClassComponent } from './../../../../accordion/demo/src/app/accordion/AccordionClassComponent';

import { AccordionClickToggleComponent } from './../../../../accordion/demo/src/app/accordion/AccordionClickToggleComponent';

import { AccordionCloseOthersComponent } from './../../../../accordion/demo/src/app/accordion/AccordionCloseOthersComponent';

import { AccordionDisabledComponent } from './../../../../accordion/demo/src/app/accordion/AccordionDisabledComponent';

import { AccordionOpenComponent } from './../../../../accordion/demo/src/app/accordion/AccordionOpenComponent';

import { ActionmenuBasicComponent } from './../../../../actionmenu/demo/src/app/actionmenu/ActionmenuBasicComponent';

import { ActionmenuDataComponent } from './../../../../actionmenu/demo/src/app/actionmenu/ActionmenuDataComponent';

import { ActionmenuData2Component } from './../../../../actionmenu/demo/src/app/actionmenu/ActionmenuData2Component';

import { ActionmenuDisabledComponent } from './../../../../actionmenu/demo/src/app/actionmenu/ActionmenuDisabledComponent';

import { ActionmenuDividerComponent } from './../../../../actionmenu/demo/src/app/actionmenu/ActionmenuDividerComponent';

import { ActionmenuEventComponent } from './../../../../actionmenu/demo/src/app/actionmenu/ActionmenuEventComponent';

import { ActionmenuFocusComponent } from './../../../../actionmenu/demo/src/app/actionmenu/ActionmenuFocusComponent';

import { ActionmenuIdComponent } from './../../../../actionmenu/demo/src/app/actionmenu/ActionmenuIdComponent';

import { ActionmenuItemsChangeComponent } from './../../../../actionmenu/demo/src/app/actionmenu/ActionmenuItemsChangeComponent';

import { ActionmenuItemsComponent } from './../../../../actionmenu/demo/src/app/actionmenu/ActionmenuItemsComponent';

import { ActionmenuLabelkeyComponent } from './../../../../actionmenu/demo/src/app/actionmenu/ActionmenuLabelkeyComponent';

import { ActionmenuManyComponent } from './../../../../actionmenu/demo/src/app/actionmenu/ActionmenuManyComponent';

import { ActionmenuMenutextComponent } from './../../../../actionmenu/demo/src/app/actionmenu/ActionmenuMenutextComponent';

import { ActionmenuPanelstyleComponent } from './../../../../actionmenu/demo/src/app/actionmenu/ActionmenuPanelstyleComponent';

import { ActionmenuShownumComponent } from './../../../../actionmenu/demo/src/app/actionmenu/ActionmenuShownumComponent';

import { ActionmenuSpaceComponent } from './../../../../actionmenu/demo/src/app/actionmenu/ActionmenuSpaceComponent';

import { ActionmenuTableComponent } from './../../../../actionmenu/demo/src/app/actionmenu/ActionmenuTableComponent';

import { ActionmenuTempleteTestComponent } from './../../../../actionmenu/demo/src/app/actionmenu/ActionmenuTempleteTestComponent';

import { ActionmenuTempleteComponent } from './../../../../actionmenu/demo/src/app/actionmenu/ActionmenuTempleteComponent';

import { ActionmenuTipsTestComponent } from './../../../../actionmenu/demo/src/app/actionmenu/ActionmenuTipsTestComponent';

import { ActionmenuTipsComponent } from './../../../../actionmenu/demo/src/app/actionmenu/ActionmenuTipsComponent';

import { AlertBoxshadowComponent } from './../../../../alert/demo/src/app/alert/AlertBoxshadowComponent';

import { AlertDarkthemeComponent } from './../../../../alert/demo/src/app/alert/AlertDarkthemeComponent';

import { AlertDismissComponent } from './../../../../alert/demo/src/app/alert/AlertDismissComponent';

import { AlertEventComponent } from './../../../../alert/demo/src/app/alert/AlertEventComponent';

import { AlertIconComponent } from './../../../../alert/demo/src/app/alert/AlertIconComponent';

import { AlertMessagesComponent } from './../../../../alert/demo/src/app/alert/AlertMessagesComponent';

import { AlertOpenTestComponent } from './../../../../alert/demo/src/app/alert/AlertOpenTestComponent';

import { AlertOpenComponent } from './../../../../alert/demo/src/app/alert/AlertOpenComponent';

import { AlertSizeComponent } from './../../../../alert/demo/src/app/alert/AlertSizeComponent';

import { AlertTriggerScrollComponent } from './../../../../alert/demo/src/app/alert/AlertTriggerScrollComponent';

import { AlertTypeComponent } from './../../../../alert/demo/src/app/alert/AlertTypeComponent';

import { AnchorBasicComponent } from './../../../../anchor/demo/src/app/anchor/AnchorBasicComponent';

import { AnchorEventsComponent } from './../../../../anchor/demo/src/app/anchor/AnchorEventsComponent';

import { AnchorIdComponent } from './../../../../anchor/demo/src/app/anchor/AnchorIdComponent';

import { AnchorItemsComponent } from './../../../../anchor/demo/src/app/anchor/AnchorItemsComponent';

import { AnchorOffsettopComponent } from './../../../../anchor/demo/src/app/anchor/AnchorOffsettopComponent';

import { AnchorScrolltargetComponent } from './../../../../anchor/demo/src/app/anchor/AnchorScrolltargetComponent';

import { AnchorSpeedComponent } from './../../../../anchor/demo/src/app/anchor/AnchorSpeedComponent';

import { AnchorTemplateComponent } from './../../../../anchor/demo/src/app/anchor/AnchorTemplateComponent';

import { AnchorTestComponent } from './../../../../anchor/demo/src/app/anchor/AnchorTestComponent';

import { AutocompleteAppendtobodyComponent } from './../../../../autocomplete/demo/src/app/autocomplete/AutocompleteAppendtobodyComponent';

import { AutocompleteBasicComponent } from './../../../../autocomplete/demo/src/app/autocomplete/AutocompleteBasicComponent';

import { AutocompleteClearableComponent } from './../../../../autocomplete/demo/src/app/autocomplete/AutocompleteClearableComponent';

import { AutocompleteDisabledComponent } from './../../../../autocomplete/demo/src/app/autocomplete/AutocompleteDisabledComponent';

import { AutocompleteEventsComponent } from './../../../../autocomplete/demo/src/app/autocomplete/AutocompleteEventsComponent';

import { AutocompleteLabelkeyComponent } from './../../../../autocomplete/demo/src/app/autocomplete/AutocompleteLabelkeyComponent';

import { AutocompleteMaxlengthComponent } from './../../../../autocomplete/demo/src/app/autocomplete/AutocompleteMaxlengthComponent';

import { AutocompletePanelSizeComponent } from './../../../../autocomplete/demo/src/app/autocomplete/AutocompletePanelSizeComponent';

import { AutocompleteTemplateComponent } from './../../../../autocomplete/demo/src/app/autocomplete/AutocompleteTemplateComponent';

import { AutocompleteTestComponent } from './../../../../autocomplete/demo/src/app/autocomplete/AutocompleteTestComponent';

import { AutocompleteTipComponent } from './../../../../autocomplete/demo/src/app/autocomplete/AutocompleteTipComponent';

import { AutocompleteValidComponent } from './../../../../autocomplete/demo/src/app/autocomplete/AutocompleteValidComponent';

import { AutocompleteGroupComponent } from './../../../../autocomplete/demo/src/app/autocomplete/AutocompleteGroupComponent';

import { AutocompleteSuggestComponent } from './../../../../autocomplete/demo/src/app/autocomplete/AutocompleteSuggestComponent';

import { AvatarImageErrorTestComponent } from './../../../../avatar/demo/src/app/avatar/AvatarImageErrorTestComponent';

import { AvatarImageComponent } from './../../../../avatar/demo/src/app/avatar/AvatarImageComponent';

import { AvatarShapeComponent } from './../../../../avatar/demo/src/app/avatar/AvatarShapeComponent';

import { AvatarSizeComponent } from './../../../../avatar/demo/src/app/avatar/AvatarSizeComponent';

import { AvatarStyleComponent } from './../../../../avatar/demo/src/app/avatar/AvatarStyleComponent';

import { AvatarTextComponent } from './../../../../avatar/demo/src/app/avatar/AvatarTextComponent';

import { ButtonColorComponent } from './../../../../button/demo/src/app/button/ButtonColorComponent';

import { ButtonDisabledComponent } from './../../../../button/demo/src/app/button/ButtonDisabledComponent';

import { ButtonEventComponent } from './../../../../button/demo/src/app/button/ButtonEventComponent';

import { ButtonFocusComponent } from './../../../../button/demo/src/app/button/ButtonFocusComponent';

import { ButtonHasborderTestComponent } from './../../../../button/demo/src/app/button/ButtonHasborderTestComponent';

import { ButtonHasborderComponent } from './../../../../button/demo/src/app/button/ButtonHasborderComponent';

import { ButtonIconComponent } from './../../../../button/demo/src/app/button/ButtonIconComponent';

import { ButtonLabelComponent } from './../../../../button/demo/src/app/button/ButtonLabelComponent';

import { ButtonLoadingComponent } from './../../../../button/demo/src/app/button/ButtonLoadingComponent';

import { ButtonOnlyiconComponent } from './../../../../button/demo/src/app/button/ButtonOnlyiconComponent';

import { ButtonSizeComponent } from './../../../../button/demo/src/app/button/ButtonSizeComponent';

import { ButtonTipComponent } from './../../../../button/demo/src/app/button/ButtonTipComponent';

import { ButtongroupActiveclassComponent } from './../../../../buttongroup/demo/src/app/buttongroup/ButtongroupActiveclassComponent';

import { ButtongroupBeforeclickComponent } from './../../../../buttongroup/demo/src/app/buttongroup/ButtongroupBeforeclickComponent';

import { ButtongroupDeselectableComponent } from './../../../../buttongroup/demo/src/app/buttongroup/ButtongroupDeselectableComponent';

import { ButtongroupDisabledComponent } from './../../../../buttongroup/demo/src/app/buttongroup/ButtongroupDisabledComponent';

import { ButtongroupEnumComponent } from './../../../../buttongroup/demo/src/app/buttongroup/ButtongroupEnumComponent';

import { ButtongroupEventComponent } from './../../../../buttongroup/demo/src/app/buttongroup/ButtongroupEventComponent';

import { ButtongroupFocusComponent } from './../../../../buttongroup/demo/src/app/buttongroup/ButtongroupFocusComponent';

import { ButtongroupIdTestComponent } from './../../../../buttongroup/demo/src/app/buttongroup/ButtongroupIdTestComponent';

import { ButtongroupIdComponent } from './../../../../buttongroup/demo/src/app/buttongroup/ButtongroupIdComponent';

import { ButtongroupItemsTestComponent } from './../../../../buttongroup/demo/src/app/buttongroup/ButtongroupItemsTestComponent';

import { ButtongroupItemsComponent } from './../../../../buttongroup/demo/src/app/buttongroup/ButtongroupItemsComponent';

import { ButtongroupManyComponent } from './../../../../buttongroup/demo/src/app/buttongroup/ButtongroupManyComponent';

import { ButtongroupMinwidthComponent } from './../../../../buttongroup/demo/src/app/buttongroup/ButtongroupMinwidthComponent';

import { ButtongroupMultiTypeComponent } from './../../../../buttongroup/demo/src/app/buttongroup/ButtongroupMultiTypeComponent';

import { ButtongroupMultilineComponent } from './../../../../buttongroup/demo/src/app/buttongroup/ButtongroupMultilineComponent';

import { ButtongroupMultipleComponent } from './../../../../buttongroup/demo/src/app/buttongroup/ButtongroupMultipleComponent';

import { ButtongroupRadioTypeComponent } from './../../../../buttongroup/demo/src/app/buttongroup/ButtongroupRadioTypeComponent';

import { ButtongroupReactiveFormsComponent } from './../../../../buttongroup/demo/src/app/buttongroup/ButtongroupReactiveFormsComponent';

import { ButtongroupSupTestComponent } from './../../../../buttongroup/demo/src/app/buttongroup/ButtongroupSupTestComponent';

import { ButtongroupSupComponent } from './../../../../buttongroup/demo/src/app/buttongroup/ButtongroupSupComponent';

import { ButtongroupTemplateComponent } from './../../../../buttongroup/demo/src/app/buttongroup/ButtongroupTemplateComponent';

import { ButtongroupTipComponent } from './../../../../buttongroup/demo/src/app/buttongroup/ButtongroupTipComponent';

import { ButtongroupValuekeyTestComponent } from './../../../../buttongroup/demo/src/app/buttongroup/ButtongroupValuekeyTestComponent';

import { ButtongroupValuekeyComponent } from './../../../../buttongroup/demo/src/app/buttongroup/ButtongroupValuekeyComponent';

import { ButtonselectBasicComponent } from './../../../../buttonselect/demo/src/app/buttonselect/ButtonselectBasicComponent';

import { ButtonselectLabelkeyComponent } from './../../../../buttonselect/demo/src/app/buttonselect/ButtonselectLabelkeyComponent';

import { CardAddComponent } from './../../../../card/demo/src/app/card/CardAddComponent';

import { CardBasicComponent } from './../../../../card/demo/src/app/card/CardBasicComponent';

import { CardGridComponent } from './../../../../card/demo/src/app/card/CardGridComponent';

import { CardGrid2Component } from './../../../../card/demo/src/app/card/CardGrid2Component';

import { CardHeaderComponent } from './../../../../card/demo/src/app/card/CardHeaderComponent';

import { CascaderBasicComponent } from './../../../../cascader/demo/src/app/cascader/CascaderBasicComponent';

import { CascaderClearableComponent } from './../../../../cascader/demo/src/app/cascader/CascaderClearableComponent';

import { CascaderDisabledComponent } from './../../../../cascader/demo/src/app/cascader/CascaderDisabledComponent';

import { CascaderEventsComponent } from './../../../../cascader/demo/src/app/cascader/CascaderEventsComponent';

import { CascaderIdkeyComponent } from './../../../../cascader/demo/src/app/cascader/CascaderIdkeyComponent';

import { CascaderItemTestComponent } from './../../../../cascader/demo/src/app/cascader/CascaderItemTestComponent';

import { CascaderLabelkeyComponent } from './../../../../cascader/demo/src/app/cascader/CascaderLabelkeyComponent';

import { CascaderOnlyselectleafComponent } from './../../../../cascader/demo/src/app/cascader/CascaderOnlyselectleafComponent';

import { CascaderPanelComponent } from './../../../../cascader/demo/src/app/cascader/CascaderPanelComponent';

import { CascaderSearchComponent } from './../../../../cascader/demo/src/app/cascader/CascaderSearchComponent';

import { CascaderShowalllevelComponent } from './../../../../cascader/demo/src/app/cascader/CascaderShowalllevelComponent';

import { CascaderTriggerComponent } from './../../../../cascader/demo/src/app/cascader/CascaderTriggerComponent';

import { CascaderValidComponent } from './../../../../cascader/demo/src/app/cascader/CascaderValidComponent';

import { CascaderValuekeyComponent } from './../../../../cascader/demo/src/app/cascader/CascaderValuekeyComponent';

import { CheckboxBasicComponent } from './../../../../checkbox/demo/src/app/checkbox/CheckboxBasicComponent';

import { CheckboxDisabledComponent } from './../../../../checkbox/demo/src/app/checkbox/CheckboxDisabledComponent';

import { CheckboxEventComponent } from './../../../../checkbox/demo/src/app/checkbox/CheckboxEventComponent';

import { CheckboxFocusedComponent } from './../../../../checkbox/demo/src/app/checkbox/CheckboxFocusedComponent';

import { CheckboxGroupComponent } from './../../../../checkbox/demo/src/app/checkbox/CheckboxGroupComponent';

import { CheckboxGroupDirectionComponent } from './../../../../checkbox/demo/src/app/checkbox/CheckboxGroupDirectionComponent';

import { CheckboxGroupLabelkeyComponent } from './../../../../checkbox/demo/src/app/checkbox/CheckboxGroupLabelkeyComponent';

import { CheckboxGroupLevelComponent } from './../../../../checkbox/demo/src/app/checkbox/CheckboxGroupLevelComponent';

import { CheckboxGroupLinewrapComponent } from './../../../../checkbox/demo/src/app/checkbox/CheckboxGroupLinewrapComponent';

import { CheckboxGroupValidationComponent } from './../../../../checkbox/demo/src/app/checkbox/CheckboxGroupValidationComponent';

import { CheckboxGroupValuekeyComponent } from './../../../../checkbox/demo/src/app/checkbox/CheckboxGroupValuekeyComponent';

import { CheckboxIndeterminateComponent } from './../../../../checkbox/demo/src/app/checkbox/CheckboxIndeterminateComponent';

import { CheckboxLabelComponent } from './../../../../checkbox/demo/src/app/checkbox/CheckboxLabelComponent';

import { CollapseBasicComponent } from './../../../../collapse/demo/src/app/collapse/CollapseBasicComponent';

import { CollapseEventComponent } from './../../../../collapse/demo/src/app/collapse/CollapseEventComponent';

import { CollapseboxBasicComponent } from './../../../../collapsebox/demo/src/app/collapsebox/CollapseboxBasicComponent';

import { CollapseboxCloseableComponent } from './../../../../collapsebox/demo/src/app/collapsebox/CollapseboxCloseableComponent';

import { CollapseboxEventComponent } from './../../../../collapsebox/demo/src/app/collapsebox/CollapseboxEventComponent';

import { CollapsebuttonBasicComponent } from './../../../../collapsebutton/demo/src/app/collapsebutton/CollapsebuttonBasicComponent';

import { CollapsebuttonCustomtextComponent } from './../../../../collapsebutton/demo/src/app/collapsebutton/CollapsebuttonCustomtextComponent';

import { CollapsebuttonSearchcountComponent } from './../../../../collapsebutton/demo/src/app/collapsebutton/CollapsebuttonSearchcountComponent';

import { CollapsebuttonEventComponent } from './../../../../collapsebutton/demo/src/app/collapsebutton/CollapsebuttonEventComponent';

import { CollapsetextBasicComponent } from './../../../../collapsetext/demo/src/app/collapsetext/CollapsetextBasicComponent';

import { CollapsetextTypeComponent } from './../../../../collapsetext/demo/src/app/collapsetext/CollapsetextTypeComponent';

import { CollapsetextHighlightComponent } from './../../../../collapsetext/demo/src/app/collapsetext/CollapsetextHighlightComponent';

import { CollapsetextCollapsedComponent } from './../../../../collapsetext/demo/src/app/collapsetext/CollapsetextCollapsedComponent';

import { CollapsetextSceneComponent } from './../../../../collapsetext/demo/src/app/collapsetext/CollapsetextSceneComponent';

import { CopyBasicComponent } from './../../../../copy/demo/src/app/copy/CopyBasicComponent';
import { CopyDarkComponent } from './../../../../copy/demo/src/app/copy/CopyDarkComponent';

import { CopyTipComponent } from './../../../../copy/demo/src/app/copy/CopyTipComponent';

import { CopyTableComponent } from './../../../../copy/demo/src/app/copy/CopyTableComponent';

import { CopyEventComponent } from './../../../../copy/demo/src/app/copy/CopyEventComponent';

import { CrumbBasicComponent } from './../../../../crumb/demo/src/app/crumb/CrumbBasicComponent';

import { CrumbEventsComponent } from './../../../../crumb/demo/src/app/crumb/CrumbEventsComponent';

import { CrumbHrefComponent } from './../../../../crumb/demo/src/app/crumb/CrumbHrefComponent';

import { CrumbRouterTestComponent } from './../../../../crumb/demo/src/app/crumb/CrumbRouterTestComponent';

import { CrumbRouterComponent } from './../../../../crumb/demo/src/app/crumb/CrumbRouterComponent';

import { DateCleariconComponent } from './../../../../date/demo/src/app/date/DateCleariconComponent';

import { DateCustomizeComponent } from './../../../../date/demo/src/app/date/DateCustomizeComponent';

import { DateDisabledComponent } from './../../../../date/demo/src/app/date/DateDisabledComponent';

import { DateDisableddaysComponent } from './../../../../date/demo/src/app/date/DateDisableddaysComponent';

import { DateEventComponent } from './../../../../date/demo/src/app/date/DateEventComponent';

import { DateFormComponent } from './../../../../date/demo/src/app/date/DateFormComponent';

import { DateFormatTestComponent } from './../../../../date/demo/src/app/date/DateFormatTestComponent';

import { DateFormatComponent } from './../../../../date/demo/src/app/date/DateFormatComponent';

import { DateMaxComponent } from './../../../../date/demo/src/app/date/DateMaxComponent';

import { DateMaxminTestComponent } from './../../../../date/demo/src/app/date/DateMaxminTestComponent';

import { DateMaxminComponent } from './../../../../date/demo/src/app/date/DateMaxminComponent';

import { DateMinComponent } from './../../../../date/demo/src/app/date/DateMinComponent';

import { DateNowdatetimeComponent } from './../../../../date/demo/src/app/date/DateNowdatetimeComponent';

import { DatePanelalignComponent } from './../../../../date/demo/src/app/date/DatePanelalignComponent';

import { DateValidationComponent } from './../../../../date/demo/src/app/date/DateValidationComponent';

import { DateValueTestComponent } from './../../../../date/demo/src/app/date/DateValueTestComponent';

import { DateValueComponent } from './../../../../date/demo/src/app/date/DateValueComponent';

import { DaterangeCustomizeComponent } from './../../../../daterange/demo/src/app/daterange/DaterangeCustomizeComponent';

import { DaterangeDisabledComponent } from './../../../../daterange/demo/src/app/daterange/DaterangeDisabledComponent';

import { DaterangeDisableddaysComponent } from './../../../../daterange/demo/src/app/daterange/DaterangeDisableddaysComponent';

import { DaterangeEventComponent } from './../../../../daterange/demo/src/app/daterange/DaterangeEventComponent';

import { DaterangeFixedvalueTestComponent } from './../../../../daterange/demo/src/app/daterange/DaterangeFixedvalueTestComponent';

import { DaterangeFixedvalueComponent } from './../../../../daterange/demo/src/app/daterange/DaterangeFixedvalueComponent';

import { DaterangeFormatTestComponent } from './../../../../daterange/demo/src/app/daterange/DaterangeFormatTestComponent';

import { DaterangeFormatComponent } from './../../../../daterange/demo/src/app/daterange/DaterangeFormatComponent';

import { DaterangeIsallowbeginequalendComponent } from './../../../../daterange/demo/src/app/daterange/DaterangeIsallowbeginequalendComponent';

import { DaterangeMaxComponent } from './../../../../daterange/demo/src/app/daterange/DaterangeMaxComponent';

import { DaterangeMaxminTestComponent } from './../../../../daterange/demo/src/app/daterange/DaterangeMaxminTestComponent';

import { DaterangeMaxminComponent } from './../../../../daterange/demo/src/app/daterange/DaterangeMaxminComponent';

import { DaterangeMinComponent } from './../../../../daterange/demo/src/app/daterange/DaterangeMinComponent';

import { DaterangeNowdatetimeComponent } from './../../../../daterange/demo/src/app/daterange/DaterangeNowdatetimeComponent';

import { DaterangePanelalignComponent } from './../../../../daterange/demo/src/app/daterange/DaterangePanelalignComponent';

import { DaterangeValidationComponent } from './../../../../daterange/demo/src/app/daterange/DaterangeValidationComponent';

import { DaterangeValueTestComponent } from './../../../../daterange/demo/src/app/daterange/DaterangeValueTestComponent';

import { DaterangeValueComponent } from './../../../../daterange/demo/src/app/daterange/DaterangeValueComponent';

import { DatetimeCleariconComponent } from './../../../../datetime/demo/src/app/datetime/DatetimeCleariconComponent';

import { DatetimeCustomizeComponent } from './../../../../datetime/demo/src/app/datetime/DatetimeCustomizeComponent';

import { DatetimeDisabledComponent } from './../../../../datetime/demo/src/app/datetime/DatetimeDisabledComponent';

import { DatetimeEventComponent } from './../../../../datetime/demo/src/app/datetime/DatetimeEventComponent';

import { DatetimeFormatTestComponent } from './../../../../datetime/demo/src/app/datetime/DatetimeFormatTestComponent';

import { DatetimeFormatComponent } from './../../../../datetime/demo/src/app/datetime/DatetimeFormatComponent';

import { DatetimeMaxComponent } from './../../../../datetime/demo/src/app/datetime/DatetimeMaxComponent';

import { DatetimeMaxminTestComponent } from './../../../../datetime/demo/src/app/datetime/DatetimeMaxminTestComponent';

import { DatetimeMaxminComponent } from './../../../../datetime/demo/src/app/datetime/DatetimeMaxminComponent';

import { DatetimeMinComponent } from './../../../../datetime/demo/src/app/datetime/DatetimeMinComponent';

import { DatetimeNowdatetimeComponent } from './../../../../datetime/demo/src/app/datetime/DatetimeNowdatetimeComponent';

import { DatetimePanelalignComponent } from './../../../../datetime/demo/src/app/datetime/DatetimePanelalignComponent';

import { DatetimeValidationComponent } from './../../../../datetime/demo/src/app/datetime/DatetimeValidationComponent';

import { DatetimeValueTestComponent } from './../../../../datetime/demo/src/app/datetime/DatetimeValueTestComponent';

import { DatetimeValueComponent } from './../../../../datetime/demo/src/app/datetime/DatetimeValueComponent';

import { DatetimeTimezoneableComponent } from './../../../../datetime/demo/src/app/datetime/DatetimeTimezoneableComponent';

import { DatetimerangeCleariconComponent } from './../../../../datetimerange/demo/src/app/datetimerange/DatetimerangeCleariconComponent';

import { DatetimerangeCustomizeComponent } from './../../../../datetimerange/demo/src/app/datetimerange/DatetimerangeCustomizeComponent';

import { DatetimerangeDisabledComponent } from './../../../../datetimerange/demo/src/app/datetimerange/DatetimerangeDisabledComponent';

import { DatetimerangeEventComponent } from './../../../../datetimerange/demo/src/app/datetimerange/DatetimerangeEventComponent';

import { DatetimerangeFormatTestComponent } from './../../../../datetimerange/demo/src/app/datetimerange/DatetimerangeFormatTestComponent';

import { DatetimerangeFormatComponent } from './../../../../datetimerange/demo/src/app/datetimerange/DatetimerangeFormatComponent';

import { DatetimerangeIsallowbeginequalendComponent } from './../../../../datetimerange/demo/src/app/datetimerange/DatetimerangeIsallowbeginequalendComponent';

import { DatetimerangeManyTestComponent } from './../../../../datetimerange/demo/src/app/datetimerange/DatetimerangeManyTestComponent';

import { DatetimerangeMaxComponent } from './../../../../datetimerange/demo/src/app/datetimerange/DatetimerangeMaxComponent';

import { DatetimerangeMaxminTestComponent } from './../../../../datetimerange/demo/src/app/datetimerange/DatetimerangeMaxminTestComponent';

import { DatetimerangeMaxminComponent } from './../../../../datetimerange/demo/src/app/datetimerange/DatetimerangeMaxminComponent';

import { DatetimerangeMinComponent } from './../../../../datetimerange/demo/src/app/datetimerange/DatetimerangeMinComponent';

import { DatetimerangeNowdatetimeComponent } from './../../../../datetimerange/demo/src/app/datetimerange/DatetimerangeNowdatetimeComponent';

import { DatetimerangePanelalignComponent } from './../../../../datetimerange/demo/src/app/datetimerange/DatetimerangePanelalignComponent';

import { DatetimerangeTimezoneableComponent } from './../../../../datetimerange/demo/src/app/datetimerange/DatetimerangeTimezoneableComponent';

import { DatetimerangeValidationComponent } from './../../../../datetimerange/demo/src/app/datetimerange/DatetimerangeValidationComponent';

import { DatetimerangeValueTestComponent } from './../../../../datetimerange/demo/src/app/datetimerange/DatetimerangeValueTestComponent';

import { DatetimerangeValueComponent } from './../../../../datetimerange/demo/src/app/datetimerange/DatetimerangeValueComponent';

import { GuidesBasicComponent } from './../../../../guides/demo/src/app/guides/GuidesBasicComponent';

import { GuidesTabComponent } from './../../../../guides/demo/src/app/guides/GuidesTabComponent';

import { GuidesGuidestepsComponent } from './../../../../guides/demo/src/app/guides/GuidesGuidestepsComponent';

import { GuidesTypeComponent } from './../../../../guides/demo/src/app/guides/GuidesTypeComponent';

import { FormfieldColspanRowspanTestComponent } from './../../../../formfield/demo/src/app/formfield/FormfieldColspanRowspanTestComponent';

import { FormfieldColspanRowspanComponent } from './../../../../formfield/demo/src/app/formfield/FormfieldColspanRowspanComponent';

import { FormfieldColswidthComponent } from './../../../../formfield/demo/src/app/formfield/FormfieldColswidthComponent';

import { FormfieldFooComponent } from './../../../../formfield/demo/src/app/formfield/FormfieldFooComponent';

import { FormfieldIndexComponent } from './../../../../formfield/demo/src/app/formfield/FormfieldIndexComponent';

import { FormfieldLabelComponent } from './../../../../formfield/demo/src/app/formfield/FormfieldLabelComponent';

import { FormfieldLabelwidthComponent } from './../../../../formfield/demo/src/app/formfield/FormfieldLabelwidthComponent';

import { FormfieldMultiColumnComponent } from './../../../../formfield/demo/src/app/formfield/FormfieldMultiColumnComponent';

import { FormfieldNestFormfiledComponent } from './../../../../formfield/demo/src/app/formfield/FormfieldNestFormfiledComponent';

import { FormfieldNgforTestComponent } from './../../../../formfield/demo/src/app/formfield/FormfieldNgforTestComponent';

import { FormfieldRequiredComponent } from './../../../../formfield/demo/src/app/formfield/FormfieldRequiredComponent';

import { FormfieldRequiredspaceComponent } from './../../../../formfield/demo/src/app/formfield/FormfieldRequiredspaceComponent';

import { FormfieldShowComponent } from './../../../../formfield/demo/src/app/formfield/FormfieldShowComponent';

import { FormfieldSingleColumnComponent } from './../../../../formfield/demo/src/app/formfield/FormfieldSingleColumnComponent';

import { FormfieldTestComponent } from './../../../../formfield/demo/src/app/formfield/FormfieldTestComponent';

import { FormfieldTextFormComponent } from './../../../../formfield/demo/src/app/formfield/FormfieldTextFormComponent';

import { FormfieldVerticalAlignComponent } from './../../../../formfield/demo/src/app/formfield/FormfieldVerticalAlignComponent';

import { FormfieldVerticalComponent } from './../../../../formfield/demo/src/app/formfield/FormfieldVerticalComponent';

import { FoldtextBasicComponent } from './../../../../foldtext/demo/src/app/foldtext/FoldtextBasicComponent';

import { FoldtextTableComponent } from './../../../../foldtext/demo/src/app/foldtext/FoldtextTableComponent';

import { GuidestepsBasicComponent } from './../../../../guidesteps/demo/src/app/guidesteps/GuidestepsBasicComponent';

import { GuidestepsIscompleteComponent } from './../../../../guidesteps/demo/src/app/guidesteps/GuidestepsIscompleteComponent';

import { GuidestepsLargeComponent } from './../../../../guidesteps/demo/src/app/guidesteps/GuidestepsLargeComponent';

import { HalfmodalAsyncComponent } from './../../../../halfmodal/demo/src/app/halfmodal/HalfmodalAsyncComponent';

import { HalfmodalBackdropComponent } from './../../../../halfmodal/demo/src/app/halfmodal/HalfmodalBackdropComponent';

import { HalfmodalBasicComponent } from './../../../../halfmodal/demo/src/app/halfmodal/HalfmodalBasicComponent';

import { HalfmodalBeforehideComponent } from './../../../../halfmodal/demo/src/app/halfmodal/HalfmodalBeforehideComponent';

import { HalfmodalContentComponent } from './../../../../halfmodal/demo/src/app/halfmodal/HalfmodalContentComponent';

import { HalfmodalModalComponent } from './../../../../halfmodal/demo/src/app/halfmodal/HalfmodalModalComponent';

import { HalfmodalModalselectComponent } from './../../../../halfmodal/demo/src/app/halfmodal/HalfmodalModalselectComponent';

import { HalfmodalMultiComponent } from './../../../../halfmodal/demo/src/app/halfmodal/HalfmodalMultiComponent';

import { HalfmodalServiceTestComponent } from './../../../../halfmodal/demo/src/app/halfmodal/HalfmodalServiceTestComponent';

import { HalfmodalServiceComponent } from './../../../../halfmodal/demo/src/app/halfmodal/HalfmodalServiceComponent';

import { IconBasicComponent } from './../../../../icon/demo/src/app/icon/IconBasicComponent';

import { SvgSetpathComponent } from '../../../../icon/demo/src/app/icon/SvgSetpathComponent';

import { IconShowComponent } from './../../../../icon/demo/src/app/icon/IconShowComponent';

import { IconactionBasicComponent } from './../../../../iconaction/demo/src/app/iconaction/IconactionBasicComponent';

import { IconactionDarkComponent } from './../../../../iconaction/demo/src/app/iconaction/IconactionDarkComponent';

import { IconactionDisabledComponent } from './../../../../iconaction/demo/src/app/iconaction/IconactionDisabledComponent';

import { IconactionHrefComponent } from './../../../../iconaction/demo/src/app/iconaction/IconactionHrefComponent';

import { ImagepreviewBasicComponent } from './../../../../imagepreview/demo/src/app/imagepreview/ImagepreviewBasicComponent';

import { InputnumberBasicComponent } from './../../../../inputnumber/demo/src/app/inputnumber/InputnumberBasicComponent';

import { InputnumberEventComponent } from './../../../../inputnumber/demo/src/app/inputnumber/InputnumberEventComponent';

import { InputnumberFocusComponent } from './../../../../inputnumber/demo/src/app/inputnumber/InputnumberFocusComponent';

import { InputnumberFormatComponent } from './../../../../inputnumber/demo/src/app/inputnumber/InputnumberFormatComponent';

import { InputnumberLoadComponent } from './../../../../inputnumber/demo/src/app/inputnumber/InputnumberLoadComponent';

import { InputnumberLocaleableComponent } from './../../../../inputnumber/demo/src/app/inputnumber/InputnumberLocaleableComponent';

import { InputnumberMaxlengthComponent } from './../../../../inputnumber/demo/src/app/inputnumber/InputnumberMaxlengthComponent';

import { IntroBasicComponent } from './../../../../intro/demo/src/app/intro/IntroBasicComponent';

import { IntroEventComponent } from './../../../../intro/demo/src/app/intro/IntroEventComponent';

import { IntroModalComponent } from './../../../../intro/demo/src/app/intro/IntroModalComponent';

import { IntroSkipableComponent } from './../../../../intro/demo/src/app/intro/IntroSkipableComponent';

import { IntroTemplateComponent } from './../../../../intro/demo/src/app/intro/IntroTemplateComponent';

import { IntroTipComponent } from './../../../../intro/demo/src/app/intro/IntroTipComponent';

import { IntroTiscrollComponent } from './../../../../intro/demo/src/app/intro/IntroTiscrollComponent';

import { IpBasicComponent } from './../../../../ip/demo/src/app/ip/IpBasicComponent';

import { IpDisabledComponent } from './../../../../ip/demo/src/app/ip/IpDisabledComponent';

import { IpFormcontrolComponent } from './../../../../ip/demo/src/app/ip/IpFormcontrolComponent';

import { IpValidComponent } from './../../../../ip/demo/src/app/ip/IpValidComponent';

import { IpsectionBasicComponent } from './../../../../ipsection/demo/src/app/ipsection/IpsectionBasicComponent';

import { IpsectionDisabledComponent } from './../../../../ipsection/demo/src/app/ipsection/IpsectionDisabledComponent';

import { IpsectionEventsComponent } from './../../../../ipsection/demo/src/app/ipsection/IpsectionEventsComponent';

import { IpsectionFocusComponent } from './../../../../ipsection/demo/src/app/ipsection/IpsectionFocusComponent';

import { IpsectionTestComponent } from './../../../../ipsection/demo/src/app/ipsection/IpsectionTestComponent';

import { IpsectionValidFormgroupComponent } from './../../../../ipsection/demo/src/app/ipsection/IpsectionValidFormgroupComponent';

import { IpsectionValidComponent } from './../../../../ipsection/demo/src/app/ipsection/IpsectionValidComponent';

import { LabeleditorBasicComponent } from './../../../../labeleditor/demo/src/app/labeleditor/LabeleditorBasicComponent';

import { LabeleditorAutotipComponent } from './../../../../labeleditor/demo/src/app/labeleditor/LabeleditorAutotipComponent';

import { LabeleditorIconTipContextComponent } from './../../../../labeleditor/demo/src/app/labeleditor/LabeleditorIconTipContextComponent';

import { LabeleditorResizeComponent } from './../../../../labeleditor/demo/src/app/labeleditor/LabeleditorResizeComponent';

import { LabeleditorMaxlineComponent } from './../../../../labeleditor/demo/src/app/labeleditor/LabeleditorMaxlineComponent';

import { LabeleditorMaxlengthComponent } from './../../../../labeleditor/demo/src/app/labeleditor/LabeleditorMaxlengthComponent';

import { LabeleditorValidationComponent } from './../../../../labeleditor/demo/src/app/labeleditor/LabeleditorValidationComponent';

import { LabeleditorValidationAsyncComponent } from './../../../../labeleditor/demo/src/app/labeleditor/LabeleditorValidationAsyncComponent';

import { LabeleditorDisabledComponent } from './../../../../labeleditor/demo/src/app/labeleditor/LabeleditorDisabledComponent';

import { LabeleditorEventsComponent } from './../../../../labeleditor/demo/src/app/labeleditor/LabeleditorEventsComponent';

import { LabeleditorMultilineSizeComponent } from './../../../../labeleditor/demo/src/app/labeleditor/LabeleditorMultilineSizeComponent';

import { LayoutBasicSimpleResponsiveComponent } from './../../../../layout/demo/src/app/layout/LayoutBasicSimpleResponsiveComponent';

import { LayoutBasicSimpleComponent } from './../../../../layout/demo/src/app/layout/LayoutBasicSimpleComponent';

import { LayoutBasicComponent } from './../../../../layout/demo/src/app/layout/LayoutBasicComponent';

import { LayoutDetailColumnComponent } from './../../../../layout/demo/src/app/layout/LayoutDetailColumnComponent';

import { LayoutDetailComponent } from './../../../../layout/demo/src/app/layout/LayoutDetailComponent';

import { LayoutListLargedataComponent } from './../../../../layout/demo/src/app/layout/LayoutListLargedataComponent';

import { LayoutListComponent } from './../../../../layout/demo/src/app/layout/LayoutListComponent';

import { LayoutMultiColumnComponent } from './../../../../layout/demo/src/app/layout/LayoutMultiColumnComponent';

import { LayoutOverviewVerticalComponent } from './../../../../layout/demo/src/app/layout/LayoutOverviewVerticalComponent';

import { LayoutOverviewComponent } from './../../../../layout/demo/src/app/layout/LayoutOverviewComponent';

import { LayoutPurchaseResponsiveChangeComponent } from './../../../../layout/demo/src/app/layout/LayoutPurchaseResponsiveChangeComponent';

import { LayoutPurchaseResponsiveComponent } from './../../../../layout/demo/src/app/layout/LayoutPurchaseResponsiveComponent';

import { LayoutPurchaseSimpleResponsiveComponent } from './../../../../layout/demo/src/app/layout/LayoutPurchaseSimpleResponsiveComponent';

import { LayoutPurchaseSimpleComponent } from './../../../../layout/demo/src/app/layout/LayoutPurchaseSimpleComponent';

import { LayoutPurchaseComponent } from './../../../../layout/demo/src/app/layout/LayoutPurchaseComponent';

import { LayoutSingleComponent } from './../../../../layout/demo/src/app/layout/LayoutSingleComponent';

import { LeftmenuActiveChangeWebsiteViewComponent } from './../../../../leftmenu/demo/src/app/leftmenu/website-views/LeftmenuActiveChangeWebsiteViewComponent';

import { LeftmenuBasicWebsiteViewComponent } from './../../../../leftmenu/demo/src/app/leftmenu/website-views/LeftmenuBasicWebsiteViewComponent';

import { LeftmenuCollapsedWebsiteViewComponent } from './../../../../leftmenu/demo/src/app/leftmenu/website-views/LeftmenuCollapsedWebsiteViewComponent';

import { LeftmenuDisabledWebsiteViewComponent } from './../../../../leftmenu/demo/src/app/leftmenu/website-views/LeftmenuDisabledWebsiteViewComponent';

import { LeftmenuDividingWebsiteViewComponent } from './../../../../leftmenu/demo/src/app/leftmenu/website-views/LeftmenuDividingWebsiteViewComponent';

import { LeftmenuFootWebsiteViewComponent } from './../../../../leftmenu/demo/src/app/leftmenu/website-views/LeftmenuFootWebsiteViewComponent';

import { LeftmenuGroupWebsiteViewComponent } from './../../../../leftmenu/demo/src/app/leftmenu/website-views/LeftmenuGroupWebsiteViewComponent';

import { LeftmenuHrefWebsiteViewComponent } from './../../../../leftmenu/demo/src/app/leftmenu/website-views/LeftmenuHrefWebsiteViewComponent';

import { LeftmenuNoRouterWebsiteViewComponent } from './../../../../leftmenu/demo/src/app/leftmenu/website-views/LeftmenuNoRouterWebsiteViewComponent';

import { LeftmenuParamsWebsiteViewComponent } from './../../../../leftmenu/demo/src/app/leftmenu/website-views/LeftmenuParamsWebsiteViewComponent';

import { LeftmenuReloadStateWebsiteViewComponent } from './../../../../leftmenu/demo/src/app/leftmenu/website-views/LeftmenuReloadStateWebsiteViewComponent';

import { LeftmenuRouterlistWebsiteViewComponent } from './../../../../leftmenu/demo/src/app/leftmenu/website-views/LeftmenuRouterlistWebsiteViewComponent';

import { LeftmenuToggleableWebsiteViewComponent } from './../../../../leftmenu/demo/src/app/leftmenu/website-views/LeftmenuToggleableWebsiteViewComponent';

import { LeftmenuthinBasicWebsiteViewsComponent } from './../../../../leftmenuthin/demo/src/app/leftmenuthin/website-views/LeftmenuthinBasicWebsiteViewsComponent';

import { LeftmenuthinParamsWebsiteViewsComponent } from './../../../../leftmenuthin/demo/src/app/leftmenuthin/website-views/LeftmenuthinParamsWebsiteViewsComponent';

import { LeftmenuthinRouterlistWebsiteViewsComponent } from './../../../../leftmenuthin/demo/src/app/leftmenuthin/website-views/LeftmenuthinRouterlistWebsiteViewsComponent';
import { LoadingAreaComponent } from './../../../../loading/demo/src/app/loading/LoadingAreaComponent';

import { LoadingBasicComponent } from './../../../../loading/demo/src/app/loading/LoadingBasicComponent';

import { LoadingSizeComponent } from './../../../../loading/demo/src/app/loading/LoadingSizeComponent';

import { LoadingTypeComponent } from './../../../../loading/demo/src/app/loading/LoadingTypeComponent';

import { LocaleBasicComponent } from './../../../../locale/demo/src/app/locale/LocaleBasicComponent';

import { LocaleLanguageComponent } from './../../../../locale/demo/src/app/locale/LocaleLanguageComponent';

import { LocaleFormatComponent } from './../../../../locale/demo/src/app/locale/LocaleFormatComponent';

import { LocaleReloadComponent } from './../../../../locale/demo/src/app/locale/LocaleReloadComponent';

import { LinkbuttonBasicComponent } from './../../../../linkbutton/demo/src/app/linkbutton/LinkbuttonBasicComponent';

import { MenuBasicComponent } from './../../../../menu/demo/src/app/menu/MenuBasicComponent';

import { MenuBeforeopenComponent } from './../../../../menu/demo/src/app/menu/MenuBeforeopenComponent';

import { MenuBorderComponent } from './../../../../menu/demo/src/app/menu/MenuBorderComponent';

import { MenuButtoncolorComponent } from './../../../../menu/demo/src/app/menu/MenuButtoncolorComponent';

import { MenuDefaultComponent } from './../../../../menu/demo/src/app/menu/MenuDefaultComponent';

import { MenuDisabledComponent } from './../../../../menu/demo/src/app/menu/MenuDisabledComponent';

import { MenuEventComponent } from './../../../../menu/demo/src/app/menu/MenuEventComponent';

import { MenuGroupComponent } from './../../../../menu/demo/src/app/menu/MenuGroupComponent';

import { MenuIdComponent } from './../../../../menu/demo/src/app/menu/MenuIdComponent';

import { MenuLabelkeyComponent } from './../../../../menu/demo/src/app/menu/MenuLabelkeyComponent';

import { MenuPanelalignComponent } from './../../../../menu/demo/src/app/menu/MenuPanelalignComponent';

import { MenuPanelstyleComponent } from './../../../../menu/demo/src/app/menu/MenuPanelstyleComponent';

import { MenuTempleteTestComponent } from './../../../../menu/demo/src/app/menu/MenuTempleteTestComponent';

import { MenuTempleteComponent } from './../../../../menu/demo/src/app/menu/MenuTempleteComponent';

import { MenuTipsComponent } from './../../../../menu/demo/src/app/menu/MenuTipsComponent';

import { MessageBasicComponent } from './../../../../message/demo/src/app/message/MessageBasicComponent';

import { MessageBtnTestComponent } from './../../../../message/demo/src/app/message/MessageBtnTestComponent';

import { MessageBtnComponent } from './../../../../message/demo/src/app/message/MessageBtnComponent';

import { MessageContentComponent } from './../../../../message/demo/src/app/message/MessageContentComponent';

import { MessageIdComponent } from './../../../../message/demo/src/app/message/MessageIdComponent';

import { MessageSecurityComponent } from './../../../../message/demo/src/app/message/MessageSecurityComponent';

import { MessageTitleComponent } from './../../../../message/demo/src/app/message/MessageTitleComponent';

import { MessageTypeComponent } from './../../../../message/demo/src/app/message/MessageTypeComponent';

import { ModalAnimationComponent } from './../../../../modal/demo/src/app/modal/ModalAnimationComponent';

import { ModalBackdropComponent } from './../../../../modal/demo/src/app/modal/ModalBackdropComponent';

import { ModalClassComponent } from './../../../../modal/demo/src/app/modal/ModalClassComponent';

import { ModalCloseIconComponent } from './../../../../modal/demo/src/app/modal/ModalCloseIconComponent';

import { ModalConfigTestComponent } from './../../../../modal/demo/src/app/modal/ModalConfigTestComponent';

import { ModalContentCompComponent } from './../../../../modal/demo/src/app/modal/ModalContentCompComponent';

import { ModalContentTempComponent } from './../../../../modal/demo/src/app/modal/ModalContentTempComponent';

import { ModalDraggableComponent } from './../../../../modal/demo/src/app/modal/ModalDraggableComponent';

import { ModalEscComponent } from './../../../../modal/demo/src/app/modal/ModalEscComponent';

import { ModalEventComponent } from './../../../../modal/demo/src/app/modal/ModalEventComponent';

import { ModalHeaderAlignComponent } from './../../../../modal/demo/src/app/modal/ModalHeaderAlignComponent';

import { ModalHeaderStyleComponent } from './../../../../modal/demo/src/app/modal/ModalHeaderStyleComponent';

import { ModalTwoBackdropComponent } from './../../../../modal/demo/src/app/modal/ModalTwoBackdropComponent';

import { ModalTwoTestComponent } from './../../../../modal/demo/src/app/modal/ModalTwoTestComponent';

import { NavActiveComponent } from './../../../../nav/demo/src/app/nav/NavActiveComponent';

import { NavAlignComponent } from './../../../../nav/demo/src/app/nav/NavAlignComponent';

import { NavBasicComponent } from './../../../../nav/demo/src/app/nav/NavBasicComponent';

import { NavDisabledComponent } from './../../../../nav/demo/src/app/nav/NavDisabledComponent';

import { NavEventComponent } from './../../../../nav/demo/src/app/nav/NavEventComponent';

import { NavLeftComponent } from './../../../../nav/demo/src/app/nav/NavLeftComponent';

import { NavRightComponent } from './../../../../nav/demo/src/app/nav/NavRightComponent';

import { NavSelectableComponent } from './../../../../nav/demo/src/app/nav/NavSelectableComponent';

import { NavSubmenuComponent } from './../../../../nav/demo/src/app/nav/NavSubmenuComponent';

import { NavTemplateComponent } from './../../../../nav/demo/src/app/nav/NavTemplateComponent';

import { NavThemeComponent } from './../../../../nav/demo/src/app/nav/NavThemeComponent';

import { NavWidthComponent } from './../../../../nav/demo/src/app/nav/NavWidthComponent';

import { NotificationAnimationComponent } from './../../../../notification/demo/src/app/notification/NotificationAnimationComponent';

import { NotificationBasicComponent } from './../../../../notification/demo/src/app/notification/NotificationBasicComponent';

import { NotificationCloseComponent } from './../../../../notification/demo/src/app/notification/NotificationCloseComponent';

import { NotificationConfigComponent } from './../../../../notification/demo/src/app/notification/NotificationConfigComponent';

import { NotificationDurationComponent } from './../../../../notification/demo/src/app/notification/NotificationDurationComponent';

import { NotificationEventsComponent } from './../../../../notification/demo/src/app/notification/NotificationEventsComponent';

import { NotificationHoverPauseComponent } from './../../../../notification/demo/src/app/notification/NotificationHoverPauseComponent';

import { NotificationNameComponent } from './../../../../notification/demo/src/app/notification/NotificationNameComponent';

import { NotificationPositionComponent } from './../../../../notification/demo/src/app/notification/NotificationPositionComponent';

import { NotificationTemplateComponent } from './../../../../notification/demo/src/app/notification/NotificationTemplateComponent';

import { NotificationTypeComponent } from './../../../../notification/demo/src/app/notification/NotificationTypeComponent';

import { OverflowDestoryComponent } from './../../../../overflow/demo/src/app/overflow/OverflowDestoryComponent';

import { OverflowDirectiveComponent } from './../../../../overflow/demo/src/app/overflow/OverflowDirectiveComponent';

import { OverflowMaxlineComponent } from './../../../../overflow/demo/src/app/overflow/OverflowMaxlineComponent';

import { OverflowMaxwidthComponent } from './../../../../overflow/demo/src/app/overflow/OverflowMaxwidthComponent';

import { OverflowPositionComponent } from './../../../../overflow/demo/src/app/overflow/OverflowPositionComponent';

import { OverflowServiceComponent } from './../../../../overflow/demo/src/app/overflow/OverflowServiceComponent';

import { OverflowTestComponent } from './../../../../overflow/demo/src/app/overflow/OverflowTestComponent';

import { OverflowTipcontentComponent } from './../../../../overflow/demo/src/app/overflow/OverflowTipcontentComponent';

import { PhonenumberBasicComponent } from './../../../../phonenumber/demo/src/app/phonenumber/PhonenumberBasicComponent';

import { PhonenumberDisabledComponent } from './../../../../phonenumber/demo/src/app/phonenumber/PhonenumberDisabledComponent';

import { PhonenumberEventComponent } from './../../../../phonenumber/demo/src/app/phonenumber/PhonenumberEventComponent';

import { PhonenumberValidComponent } from './../../../../phonenumber/demo/src/app/phonenumber/PhonenumberValidComponent';

import { PhonenumberCountryComponent } from './../../../../phonenumber/demo/src/app/phonenumber/PhonenumberCountryComponent';

import { PaginationAutohideComponent } from './../../../../pagination/demo/src/app/pagination/PaginationAutohideComponent';

import { PaginationDisabledComponent } from './../../../../pagination/demo/src/app/pagination/PaginationDisabledComponent';

import { PaginationEventComponent } from './../../../../pagination/demo/src/app/pagination/PaginationEventComponent';

import { PaginationFixedComponent } from './../../../../pagination/demo/src/app/pagination/PaginationFixedComponent';

import { PaginationLoadingComponent } from './../../../../pagination/demo/src/app/pagination/PaginationLoadingComponent';

import { PaginationPageselectwidthComponent } from './../../../../pagination/demo/src/app/pagination/PaginationPageselectwidthComponent';

import { PaginationPagesizeComponent } from './../../../../pagination/demo/src/app/pagination/PaginationPagesizeComponent';

import { PaginationShowgotolinkComponent } from './../../../../pagination/demo/src/app/pagination/PaginationShowgotolinkComponent';

import { PaginationShowlastpageComponent } from './../../../../pagination/demo/src/app/pagination/PaginationShowlastpageComponent';

import { PaginationShowtotalnumberComponent } from './../../../../pagination/demo/src/app/pagination/PaginationShowtotalnumberComponent';

import { PaginationTypeComponent } from './../../../../pagination/demo/src/app/pagination/PaginationTypeComponent';

import { PathfieldItemsComponent } from './../../../../path/demo/src/app/path/PathfieldItemsComponent';

import { PathfieldIspanelComponent } from './../../../../path/demo/src/app/path/PathfieldIspanelComponent';

import { PathfieldPanelwidthComponent } from './../../../../path/demo/src/app/path/PathfieldPanelwidthComponent';

import { PathfieldEditableComponent } from './../../../../path/demo/src/app/path/PathfieldEditableComponent';

import { PathfieldEventComponent } from '../../../../path/demo/src/app/path/PathfieldEventComponent';

import { PathListComponent } from './../../../../path/demo/src/app/path/PathListComponent';

import { PathSelectComponent } from './../../../../path/demo/src/app/path/PathSelectComponent';

import { PopconfirmBasicComponent } from './../../../../popconfirm/demo/src/app/popconfirm/PopconfirmBasicComponent';

import { PopconfirmDefineComponent } from './../../../../popconfirm/demo/src/app/popconfirm/PopconfirmDefineComponent';

import { PopconfirmEventComponent } from './../../../../popconfirm/demo/src/app/popconfirm/PopconfirmEventComponent';

import { PopconfirmTableDefineComponent } from './../../../../popconfirm/demo/src/app/popconfirm/PopconfirmTableDefineComponent';

import { PopconfirmTableComponent } from './../../../../popconfirm/demo/src/app/popconfirm/PopconfirmTableComponent';

import { ProgressbarAnimationComponent } from './../../../../progressbar/demo/src/app/progressbar/ProgressbarAnimationComponent';

import { ProgressbarBasicComponent } from './../../../../progressbar/demo/src/app/progressbar/ProgressbarBasicComponent';

import { ProgressbarClassComponent } from './../../../../progressbar/demo/src/app/progressbar/ProgressbarClassComponent';

import { ProductpreviewBasicComponent } from './../../../../productpreview/demo/src/app/productpreview/ProductpreviewBasicComponent';

import { RadioBasicComponent } from './../../../../radio/demo/src/app/radio/RadioBasicComponent';

import { RadioDarkComponent } from './../../../../radio/demo/src/app/radio/RadioDarkComponent';

import { RadioDisabledComponent } from './../../../../radio/demo/src/app/radio/RadioDisabledComponent';

import { RadioEventComponent } from './../../../../radio/demo/src/app/radio/RadioEventComponent';

import { RadioFocusComponent } from './../../../../radio/demo/src/app/radio/RadioFocusComponent';

import { RadioGroupComponent } from './../../../../radio/demo/src/app/radio/RadioGroupComponent';

import { RadioGroupDirectionComponent } from './../../../../radio/demo/src/app/radio/RadioGroupDirectionComponent';

import { RadioGroupLabelkeyComponent } from './../../../../radio/demo/src/app/radio/RadioGroupLabelkeyComponent';

import { RadioGroupLinewrapComponent } from './../../../../radio/demo/src/app/radio//RadioGroupLinewrapComponent';

import { RadioGroupValidationComponent } from './../../../../radio/demo/src/app/radio//RadioGroupValidationComponent';

import { RadioGroupValuekeyComponent } from './../../../../radio/demo/src/app/radio/RadioGroupValuekeyComponent';

import { RadioLabelComponent } from './../../../../radio/demo/src/app/radio/RadioLabelComponent';

import { RateBasicComponent } from './../../../../rate/demo/src/app/rate/RateBasicComponent';

import { RateDisabledComponent } from './../../../../rate/demo/src/app/rate/RateDisabledComponent';

import { RateEventComponent } from './../../../../rate/demo/src/app/rate/RateEventComponent';

import { RateIdComponent } from './../../../../rate/demo/src/app/rate/RateIdComponent';

import { RateLoadComponent } from './../../../../rate/demo/src/app/rate/RateLoadComponent';

import { RightsBasicComponent } from './../../../../rights/demo/src/app/rights/RightsBasicComponent';

import { RightsTypeComponent } from './../../../../rights/demo/src/app/rights/RightsTypeComponent';

import { ScoreBasicComponent } from './../../../../score/demo/src/app/score/ScoreBasicComponent';

import { ScoreEventsComponent } from './../../../../score/demo/src/app/score/ScoreEventsComponent';

import { ScoreLimittextComponent } from './../../../../score/demo/src/app/score/ScoreLimittextComponent';

import { ScorePaddingComponent } from './../../../../score/demo/src/app/score/ScorePaddingComponent';

import { SearchboxAppendtobodyComponent } from './../../../../searchbox/demo/src/app/searchbox/SearchboxAppendtobodyComponent';

import { SearchboxBasicComponent } from './../../../../searchbox/demo/src/app/searchbox/SearchboxBasicComponent';

import { SearchboxDisabledComponent } from './../../../../searchbox/demo/src/app/searchbox/SearchboxDisabledComponent';

import { SearchboxEventComponent } from './../../../../searchbox/demo/src/app/searchbox/SearchboxEventComponent';

import { SearchboxMaxlengthComponent } from './../../../../searchbox/demo/src/app/searchbox/SearchboxMaxlengthComponent';

import { SearchboxNotsearchComponent } from './../../../../searchbox/demo/src/app/searchbox/SearchboxNotsearchComponent';

import { SearchboxOptionsComponent } from './../../../../searchbox/demo/src/app/searchbox/SearchboxOptionsComponent';

import { SearchboxPanelsizeComponent } from './../../../../searchbox/demo/src/app/searchbox/SearchboxPanelsizeComponent';

import { SearchboxReactiveComponent } from './../../../../searchbox/demo/src/app/searchbox/SearchboxReactiveComponent';

import { SearchboxSuggestComponent } from './../../../../searchbox/demo/src/app/searchbox/SearchboxSuggestComponent';

import { SearchboxTemplateComponent } from './../../../../searchbox/demo/src/app/searchbox/SearchboxTemplateComponent';

import { SearchboxTestComponent } from './../../../../searchbox/demo/src/app/searchbox/SearchboxTestComponent';

import { SearchboxTrimmedComponent } from './../../../../searchbox/demo/src/app/searchbox/SearchboxTrimmedComponent';

import { SearchboxValidComponent } from './../../../../searchbox/demo/src/app/searchbox/SearchboxValidComponent';

import { SearchboxVirtualscrollComponent } from './../../../../searchbox/demo/src/app/searchbox/SearchboxVirtualscrollComponent';

import { SelectgroupBasicComponent } from './../../../../selectgroup/demo/src/app/selectgroup/SelectgroupBasicComponent';

import { SelectgroupMultipleComponent } from './../../../../selectgroup/demo/src/app/selectgroup/SelectgroupMultipleComponent';

import { SelectgroupValuekeyComponent } from './../../../../selectgroup/demo/src/app/selectgroup/SelectgroupValuekeyComponent';

import { SelectgroupTemplateComponent } from './../../../../selectgroup/demo/src/app/selectgroup/SelectgroupTemplateComponent';

import { SelectgroupSelectComponent } from './../../../../selectgroup/demo/src/app/selectgroup/SelectgroupSelectComponent';

import { SelectAppendtobodyComponent } from './../../../../select/demo/src/app/select/SelectAppendtobodyComponent';

import { SelectBasicComponent } from './../../../../select/demo/src/app/select/SelectBasicComponent';

import { SelectBeforesearchTestComponent } from './../../../../select/demo/src/app/select/SelectBeforesearchTestComponent';

import { SelectBeforesearchComponent } from './../../../../select/demo/src/app/select/SelectBeforesearchComponent';

import { SelectChangeSelectallComponent } from './../../../../select/demo/src/app/select/SelectChangeSelectallComponent';

import { SelectClearableComponent } from './../../../../select/demo/src/app/select/SelectClearableComponent';

import { SelectDisabledComponent } from './../../../../select/demo/src/app/select/SelectDisabledComponent';

import { SelectDisabledfocusComponent } from './../../../../select/demo/src/app/select/SelectDisabledfocusComponent';

import { SelectEnumComponent } from './../../../../select/demo/src/app/select/SelectEnumComponent';

import { SelectEventComponent } from './../../../../select/demo/src/app/select/SelectEventComponent';

import { SelectFocusComponent } from './../../../../select/demo/src/app/select/SelectFocusComponent';

import { SelectGroupComponent } from './../../../../select/demo/src/app/select/SelectGroupComponent';

import { SelectIdComponent } from './../../../../select/demo/src/app/select/SelectIdComponent';

import { SelectIdkeyComponent } from './../../../../select/demo/src/app/select/SelectIdkeyComponent';

import { SelectInputComponent } from './../../../../select/demo/src/app/select/SelectInputComponent';

import { SelectLabelkeyComponent } from './../../../../select/demo/src/app/select/SelectLabelkeyComponent';

import { SelectLazyComponent } from './../../../../select/demo/src/app/select/SelectLazyComponent';

import { SelectLeakComponent } from './../../../../select/demo/src/app/select/SelectLeakComponent';

import { SelectLoadComponent } from './../../../../select/demo/src/app/select/SelectLoadComponent';

import { SelectManyComponent } from './../../../../select/demo/src/app/select/SelectManyComponent';

import { SelectMaxlineComponent } from './../../../../select/demo/src/app/select/SelectMaxlineComponent';

import { SelectMuchComponent } from './../../../../select/demo/src/app/select/SelectMuchComponent';

import { SelectMultiComponent } from './../../../../select/demo/src/app/select/SelectMultiComponent';

import { SelectNoborderComponent } from './../../../../select/demo/src/app/select/SelectNoborderComponent';

import { SelectNodataComponent } from './../../../../select/demo/src/app/select/SelectNodataComponent';

import { SelectNoemptyComponent } from './../../../../select/demo/src/app/select/SelectNoemptyComponent';

import { SelectNullComponent } from './../../../../select/demo/src/app/select/SelectNullComponent';

import { SelectPaginBeforesearchComponent } from './../../../../select/demo/src/app/select/SelectPaginBeforesearchComponent';

import { SelectPaginationComponent } from './../../../../select/demo/src/app/select/SelectPaginationComponent';

import { SelectPanelComponent } from './../../../../select/demo/src/app/select/SelectPanelComponent';

import { SelectReservesearchwordComponent } from './../../../../select/demo/src/app/select/SelectReservesearchwordComponent';

import { SelectScrollLoadComponent } from './../../../../select/demo/src/app/select/SelectScrollLoadComponent';

import { SelectSearchComponent } from './../../../../select/demo/src/app/select/SelectSearchComponent';

import { SelectSearchkeysComponent } from './../../../../select/demo/src/app/select/SelectSearchkeysComponent';

import { SelectSelectallComponent } from './../../../../select/demo/src/app/select/SelectSelectallComponent';

import { SelectShowselectednumberComponent } from './../../../../select/demo/src/app/select/SelectShowselectednumberComponent';

import { SelectSmallComponent } from './../../../../select/demo/src/app/select/SelectSmallComponent';

import { SelectTagComponent } from './../../../../select/demo/src/app/select/SelectTagComponent';

import { SelectTemplateComponent } from './../../../../select/demo/src/app/select/SelectTemplateComponent';

import { SelectTipComponent } from './../../../../select/demo/src/app/select/SelectTipComponent';

import { SelectTiscrollComponent } from './../../../../select/demo/src/app/select/SelectTiscrollComponent';

import { SelectTworowComponent } from './../../../../select/demo/src/app/select/SelectTworowComponent';

import { SelectValidComponent } from './../../../../select/demo/src/app/select/SelectValidComponent';

import { SelectValidgroupComponent } from './../../../../select/demo/src/app/select/SelectValidgroupComponent';

import { SelectValuekeyTestComponent } from './../../../../select/demo/src/app/select/SelectValuekeyTestComponent';

import { SelectValuekeyComponent } from './../../../../select/demo/src/app/select/SelectValuekeyComponent';

import { SelectVirtualscrollMultiComponent } from './../../../../select/demo/src/app/select/SelectVirtualscrollMultiComponent';

import { SelectVirtualscrollComponent } from './../../../../select/demo/src/app/select/SelectVirtualscrollComponent';

import { SkeletonPageComponent } from './../../../../skeleton/demo/src/app/skeleton/SkeletonPageComponent';

import { SkeletonTitleComponent } from './../../../../skeleton/demo/src/app/skeleton/SkeletonTitleComponent';

import { SkeletonTypeComponent } from './../../../../skeleton/demo/src/app/skeleton/SkeletonTypeComponent';

import { SliderEventComponent } from './../../../../slider/demo/src/app/slider/SliderEventComponent';

import { SliderFormcontrolComponent } from './../../../../slider/demo/src/app/slider/SliderFormcontrolComponent';

import { SliderHiddenComponent } from './../../../../slider/demo/src/app/slider/SliderHiddenComponent';

import { SliderLimitsComponent } from './../../../../slider/demo/src/app/slider/SliderLimitsComponent';

import { SliderRatiosComponent } from './../../../../slider/demo/src/app/slider/SliderRatiosComponent';

import { SliderScalesComponent } from './../../../../slider/demo/src/app/slider/SliderScalesComponent';

import { SliderTemplateComponent } from './../../../../slider/demo/src/app/slider/SliderTemplateComponent';

import { SliderTipComponent } from './../../../../slider/demo/src/app/slider/SliderTipComponent';

import { SpinnerBasicTestComponent } from './../../../../spinner/demo/src/app/spinner/SpinnerBasicTestComponent';

import { SpinnerBasicComponent } from './../../../../spinner/demo/src/app/spinner/SpinnerBasicComponent';

import { SpinnerCorrectableComponent } from './../../../../spinner/demo/src/app/spinner/SpinnerCorrectableComponent';

import { SpinnerDisabledComponent } from './../../../../spinner/demo/src/app/spinner/SpinnerDisabledComponent';

import { SpinnerEventComponent } from './../../../../spinner/demo/src/app/spinner/SpinnerEventComponent';

import { SpinnerFormatComponent } from './../../../../spinner/demo/src/app/spinner/SpinnerFormatComponent';

import { SpinnerLoadComponent } from './../../../../spinner/demo/src/app/spinner/SpinnerLoadComponent';

import { SpinnerLocaleableComponent } from './../../../../spinner/demo/src/app/spinner/SpinnerLocaleableComponent';

import { SpinnerMaxMinComponent } from './../../../../spinner/demo/src/app/spinner/SpinnerMaxMinComponent';

import { SpinnerMaxlengthComponent } from './../../../../spinner/demo/src/app/spinner/SpinnerMaxlengthComponent';

import { SpinnerStepComponent } from './../../../../spinner/demo/src/app/spinner/SpinnerStepComponent';

import { SpinnerStepfnComponent } from './../../../../spinner/demo/src/app/spinner/SpinnerStepfnComponent';

import { SpinnerTipTestComponent } from './../../../../spinner/demo/src/app/spinner/SpinnerTipTestComponent';

import { SpinnerTipComponent } from './../../../../spinner/demo/src/app/spinner/SpinnerTipComponent';

import { SpinnerValidationTestComponent } from './../../../../spinner/demo/src/app/spinner/SpinnerValidationTestComponent';

import { SpinnerValidationComponent } from './../../../../spinner/demo/src/app/spinner/SpinnerValidationComponent';

import { StepsActiveComponent } from './../../../../steps/demo/src/app/steps/StepsActiveComponent';

import { StepsAdaptiveTestComponent } from './../../../../steps/demo/src/app/steps/StepsAdaptiveTestComponent';

import { StepsAdaptiveComponent } from './../../../../steps/demo/src/app/steps/StepsAdaptiveComponent';

import { StepsBaseComponent } from './../../../../steps/demo/src/app/steps/StepsBaseComponent';

import { StepsBeforeComponent } from './../../../../steps/demo/src/app/steps/StepsBeforeComponent';

import { StepsClickableComponent } from './../../../../steps/demo/src/app/steps/StepsClickableComponent';

import { StepsEventsComponent } from './../../../../steps/demo/src/app/steps/StepsEventsComponent';

import { StepsLabelComponent } from './../../../../steps/demo/src/app/steps/StepsLabelComponent';

import { StepsMaxwidthComponent } from './../../../../steps/demo/src/app/steps/StepsMaxwidthComponent';

import { StepsTemplateComponent } from './../../../../steps/demo/src/app/steps/StepsTemplateComponent';

import { SubtitleBasicComponent } from './../../../../subtitle/demo/src/app/subtitle/SubtitleBasicComponent';

import { SubtitleBeforeSearchComponent } from './../../../../subtitle/demo/src/app/subtitle/SubtitleBeforeSearchComponent';

import { SubtitleDarkComponent } from './../../../../subtitle/demo/src/app/subtitle/SubtitleDarkComponent';

import { SubtitleEventComponent } from './../../../../subtitle/demo/src/app/subtitle/SubtitleEventComponent';

import { SubtitleIdkeyComponent } from './../../../../subtitle/demo/src/app/subtitle/SubtitleIdkeyComponent';

import { SubtitleItemsComponent } from './../../../../subtitle/demo/src/app/subtitle/SubtitleItemsComponent';

import { SubtitleMaxwidthComponent } from './../../../../subtitle/demo/src/app/subtitle/SubtitleMaxwidthComponent';

import { SubtitlePanelwidthComponent } from './../../../../subtitle/demo/src/app/subtitle/SubtitlePanelwidthComponent';

import { SubtitleRouteComponent } from './../../../../subtitle/demo/src/app/subtitle/SubtitleRouteComponent';

import { SubtitleScrollLoadComponent } from './../../../../subtitle/demo/src/app/subtitle/SubtitleScrollLoadComponent';

import { SubtitleSearchableComponent } from './../../../../subtitle/demo/src/app/subtitle/SubtitleSearchableComponent';

import { SubtitleTargetComponent } from './../../../../subtitle/demo/src/app/subtitle/SubtitleTargetComponent';

import { SubtitleTipPositionComponent } from './../../../../subtitle/demo/src/app/subtitle/SubtitleTipPositionComponent';

import { SwiperActiveindexComponent } from './../../../../swiper/demo/src/app/swiper/SwiperActiveindexComponent';

import { SwiperAutoplayComponent } from './../../../../swiper/demo/src/app/swiper/SwiperAutoplayComponent';

import { SwiperBasicComponent } from './../../../../swiper/demo/src/app/swiper/SwiperBasicComponent';

import { SwiperEventsComponent } from './../../../../swiper/demo/src/app/swiper/SwiperEventsComponent';

import { SwiperIndicatorpositionComponent } from './../../../../swiper/demo/src/app/swiper/SwiperIndicatorpositionComponent';

import { SwiperLoopComponent } from './../../../../swiper/demo/src/app/swiper/SwiperLoopComponent';

import { SwiperShowcardnumTestComponent } from './../../../../swiper/demo/src/app/swiper/SwiperShowcardnumTestComponent';

import { SwiperShowcardnumComponent } from './../../../../swiper/demo/src/app/swiper/SwiperShowcardnumComponent';

import { SwitchBasicComponent } from './../../../../switch/demo/src/app/switch/SwitchBasicComponent';

import { SwitchBeforeComponent } from './../../../../switch/demo/src/app/switch/SwitchBeforeComponent';

import { SwitchDisabledComponent } from './../../../../switch/demo/src/app/switch/SwitchDisabledComponent';

import { SwitchEventComponent } from './../../../../switch/demo/src/app/switch/SwitchEventComponent';

import { SwitchExplanationComponent } from './../../../../switch/demo/src/app/switch/SwitchExplanationComponent';

import { SwitchFocusComponent } from './../../../../switch/demo/src/app/switch/SwitchFocusComponent';

import { SwitchIdComponent } from './../../../../switch/demo/src/app/switch/SwitchIdComponent';

import { SwitchLoadComponent } from './../../../../switch/demo/src/app/switch/SwitchLoadComponent';

import { SwitchTemplateComponent } from './../../../../switch/demo/src/app/switch/SwitchTemplateComponent';

import { TabBasicComponent } from './../../../../tab/demo/src/app/tab/TabBasicComponent';

import { TabBeforeactivechangeComponent } from './../../../../tab/demo/src/app/tab/TabBeforeactivechangeComponent';

import { TabContentCompComponent } from './../../../../tab/demo/src/app/tab/TabContentCompComponent';

import { TabCustomHeadComponent } from './../../../../tab/demo/src/app/tab/TabCustomHeadComponent';

import { TabDarkComponent } from './../../../../tab/demo/src/app/tab/TabDarkComponent';

import { TabDefaultTestComponent } from './../../../../tab/demo/src/app/tab/TabDefaultTestComponent';

import { TabLazyLoadComponent } from './../../../../tab/demo/src/app/tab/TabLazyLoadComponent';

import { TabLevel2TestComponent } from './../../../../tab/demo/src/app/tab/TabLevel2TestComponent';

import { TabLevel2Component } from './../../../../tab/demo/src/app/tab/TabLevel2Component';

import { TabOverflowComponent } from './../../../../tab/demo/src/app/tab/TabOverflowComponent';

import { TabRouteWebsiteViewComponent } from './../../../../tab/demo/src/app/tab/website-views/TabRouteWebsiteViewComponent';

import { TabScrollComponent } from './../../../../tab/demo/src/app/tab/TabScrollComponent';

import { TabSmallComponent } from './../../../../tab/demo/src/app/tab/TabSmallComponent';

import { TableActionmenuComponent } from './../../../../table/demo/src/app/table/TableActionmenuComponent';

import { TableBasicTestComponent } from './../../../../table/demo/src/app/table/TableBasicTestComponent';

import { TableBasicComponent } from './../../../../table/demo/src/app/table/TableBasicComponent';

import { TableCellTipComponent } from './../../../../table/demo/src/app/table/TableCellTipComponent';

import { TableCelliconsColsresizableComponent } from './../../../../table/demo/src/app/table/TableCelliconsColsresizableComponent';

import { TableCheckboxPaginationHeadmenuComponent } from './../../../../table/demo/src/app/table/TableCheckboxPaginationHeadmenuComponent';

import { TableCheckboxPaginationComponent } from './../../../../table/demo/src/app/table/TableCheckboxPaginationComponent';

import { TableCheckboxComponent } from './../../../../table/demo/src/app/table/TableCheckboxComponent';

import { TableColAlignComponent } from './../../../../table/demo/src/app/table/TableColAlignComponent';

import { TableColalignSortResizableTestComponent } from './../../../../table/demo/src/app/table/TableColalignSortResizableTestComponent';

import { TableColsResizableComponent } from './../../../../table/demo/src/app/table/TableColsResizableComponent';

import { TableColsToggleDetailsComponent } from './../../../../table/demo/src/app/table/TableColsToggleDetailsComponent';

import { TableColsToggleTestComponent } from './../../../../table/demo/src/app/table/TableColsToggleTestComponent';

import { TableColsToggleComponent } from './../../../../table/demo/src/app/table/TableColsToggleComponent';

import { TableColsresizableBasicComponent } from './../../../../table/demo/src/app/table/TableColsresizableBasicComponent';

import { TableColsresizableColstoggleFixedheadComponent } from './../../../../table/demo/src/app/table/TableColsresizableColstoggleFixedheadComponent';

import { TableColsresizableColstoggleComponent } from './../../../../table/demo/src/app/table/TableColsresizableColstoggleComponent';

import { TableColsresizableLoadfailComponent } from './../../../../table/demo/src/app/table/TableColsresizableLoadfailComponent';

import { TableColsresizableSortHeadfilterComponent } from './../../../../table/demo/src/app/table/TableColsresizableSortHeadfilterComponent';

import { TableColsresizableSortComponent } from './../../../../table/demo/src/app/table/TableColsresizableSortComponent';

import { TableColumnFixedComponent } from './../../../../table/demo/src/app/table/TableColumnFixedComponent';

import { TableColumnfixedCheckboxComponent } from './../../../../table/demo/src/app/table/TableColumnfixedCheckboxComponent';

import { TableColumnfixedColstoggleComponent } from './../../../../table/demo/src/app/table/TableColumnfixedColstoggleComponent';

import { TableColumnfixedEditrowComponent } from './../../../../table/demo/src/app/table/TableColumnfixedEditrowComponent';

import { TableColumnfixedFixedheadColsresizablePaginationComponent } from './../../../../table/demo/src/app/table/TableColumnfixedFixedheadColsresizablePaginationComponent';

import { TableColumnfixedHeadfixedComponent } from './../../../../table/demo/src/app/table/TableColumnfixedHeadfixedComponent';

import { TableColumnfixedLeftmenuComponent } from './../../../../table/demo/src/app/table/TableColumnfixedLeftmenuComponent';

import { TableColumnfixedNodataComponent } from './../../../../table/demo/src/app/table/TableColumnfixedNodataComponent';

import { TableColumnfixedPaginationComponent } from './../../../../table/demo/src/app/table/TableColumnfixedPaginationComponent';

import { TableColumnfixedResizableComponent } from './../../../../table/demo/src/app/table/TableColumnfixedResizableComponent';

import { TableComprehensiveComponent } from './../../../../table/demo/src/app/table/TableComprehensiveComponent';

import { TableDetailsCloseotherdetailsComponent } from './../../../../table/demo/src/app/table/TableDetailsCloseotherdetailsComponent';

import { TableDetailsNesttableComponent } from './../../../../table/demo/src/app/table/TableDetailsNesttableComponent';

import { TableDetailsPaginationComponent } from './../../../../table/demo/src/app/table/TableDetailsPaginationComponent';

import { TableDetailsComponent } from './../../../../table/demo/src/app/table/TableDetailsComponent';

import { TableDynamicDetailsComponent } from './../../../../table/demo/src/app/table/TableDynamicDetailsComponent';

import { TableEditallTestComponent } from './../../../../table/demo/src/app/table/TableEditallTestComponent';

import { TableEditallComponent } from './../../../../table/demo/src/app/table/TableEditallComponent';

import { TableEditrowTestComponent } from './../../../../table/demo/src/app/table/TableEditrowTestComponent';

import { TableEditrowComponent } from './../../../../table/demo/src/app/table/TableEditrowComponent';

import { TableFilterStrictComponent } from './../../../../table/demo/src/app/table/TableFilterStrictComponent';

import { TableFilterComponent } from './../../../../table/demo/src/app/table/TableFilterComponent';

import { TableFixedHeadColsResizableComponent } from './../../../../table/demo/src/app/table/TableFixedHeadColsResizableComponent';

import { TableFixedHeadInAccordionComponent } from './../../../../table/demo/src/app/table/TableFixedHeadInAccordionComponent';

import { TableFixedHeadNodataComponent } from './../../../../table/demo/src/app/table/TableFixedHeadNodataComponent';

import { TableFixedHeadPaginationDetailsComponent } from './../../../../table/demo/src/app/table/TableFixedHeadPaginationDetailsComponent';

import { TableFixedHeadComponent } from './../../../../table/demo/src/app/table/TableFixedHeadComponent';

import { TableFixedheadColsresizablePaginationDetailsComponent } from './../../../../table/demo/src/app/table/TableFixedheadColsresizablePaginationDetailsComponent';

import { TableFixheadScrollComponent } from './../../../../table/demo/src/app/table/TableFixheadScrollComponent';

import { TableGroupComponent } from './../../../../table/demo/src/app/table/TableGroupComponent';

import { TableGuideComponent } from './../../../../table/demo/src/app/table/TableGuideComponent';

import { TableHeadFilterDatetimeTestComponent } from './../../../../table/demo/src/app/table/TableHeadFilterDatetimeTestComponent';

import { TableHeadFilterDatetimeComponent } from './../../../../table/demo/src/app/table/TableHeadFilterDatetimeComponent';

import { TableHeadFilterMultiValuekeyComponent } from './../../../../table/demo/src/app/table/TableHeadFilterMultiValuekeyComponent';

import { TableHeadFilterMultiComponent } from './../../../../table/demo/src/app/table/TableHeadFilterMultiComponent';

import { TableHeadFilterTestComponent } from './../../../../table/demo/src/app/table/TableHeadFilterTestComponent';

import { TableHeadFilterValuekeyComponent } from './../../../../table/demo/src/app/table/TableHeadFilterValuekeyComponent';

import { TableHeadFilterVirtualscrollComponent } from './../../../../table/demo/src/app/table/TableHeadFilterVirtualscrollComponent';

import { TableHeadFilterComponent } from './../../../../table/demo/src/app/table/TableHeadFilterComponent';

import { TableLoadFailComponent } from './../../../../table/demo/src/app/table/TableLoadFailComponent';

import { TableNodataSimpleComponent } from './../../../../table/demo/src/app/table/TableNodataSimpleComponent';

import { TableNodataTestComponent } from './../../../../table/demo/src/app/table/TableNodataTestComponent';

import { TableNodataComponent } from './../../../../table/demo/src/app/table/TableNodataComponent';

import { TableOverflowLinkComponent } from './../../../../table/demo/src/app/table/TableOverflowLinkComponent';

import { TablePagiWithFilterComponent } from './../../../../table/demo/src/app/table/TablePagiWithFilterComponent';

import { TablePaginationComponent } from './../../../../table/demo/src/app/table/TablePaginationComponent';

import { TableRadioTestComponent } from './../../../../table/demo/src/app/table/TableRadioTestComponent';

import { TableRadioComponent } from './../../../../table/demo/src/app/table/TableRadioComponent';

import { TableRowDrag2Component } from './../../../../table/demo/src/app/table/TableRowDrag2Component';

import { TableRowspanComponent } from './../../../../table/demo/src/app/table/TableRowspanComponent';

import { TableSearchComponent } from './../../../../table/demo/src/app/table/TableSearchComponent';

import { TableServerPagiSearchSortComponent } from './../../../../table/demo/src/app/table/TableServerPagiSearchSortComponent';

import { TableServerPagiComponent } from './../../../../table/demo/src/app/table/TableServerPagiComponent';

import { TableSmallComponent } from './../../../../table/demo/src/app/table/TableSmallComponent';

import { TableSoldoutComponent } from './../../../../table/demo/src/app/table/TableSoldoutComponent';

import { TableSortBasicComponent } from './../../../../table/demo/src/app/table/TableSortBasicComponent';

import { TableSortComparefnLocaleComponent } from './../../../../table/demo/src/app/table/TableSortComparefnLocaleComponent';

import { TableSortComparefnComponent } from './../../../../table/demo/src/app/table/TableSortComparefnComponent';

import { TableSortDetailsComponent } from './../../../../table/demo/src/app/table/TableSortDetailsComponent';

import { TableSortResetComponent } from './../../../../table/demo/src/app/table/TableSortResetComponent';

import { TableSortTestComponent } from './../../../../table/demo/src/app/table/TableSortTestComponent';

import { TableSortComponent } from './../../../../table/demo/src/app/table/TableSortComponent';

import { TableStorageConfigComponent } from './../../../../table/demo/src/app/table/TableStorageConfigComponent';

import { TableStorageFilterComponent } from './../../../../table/demo/src/app/table/TableStorageFilterComponent';

import { TableStorageServeComponent } from './../../../../table/demo/src/app/table/TableStorageServeComponent';

import { TableStorageComponent } from './../../../../table/demo/src/app/table/TableStorageComponent';

import { TableTreeMulitiselectComponent } from './../../../../table/demo/src/app/table/TableTreeMulitiselectComponent';

import { TableTreeUnknowdeepthComponent } from './../../../../table/demo/src/app/table/TableTreeUnknowdeepthComponent';

import { TableTreeComponent } from './../../../../table/demo/src/app/table/TableTreeComponent';

import { TableVirtualscrollBasicComponent } from './../../../../table/demo/src/app/table/TableVirtualscrollBasicComponent';

import { TableVirtualscrollComprehensiveComponent } from './../../../../table/demo/src/app/table/TableVirtualscrollComprehensiveComponent';

import { TableVirtualscrollSizesComponent } from './../../../../table/demo/src/app/table/TableVirtualscrollSizesComponent';

import { TableVirtualscrollTreeComponent } from './../../../../table/demo/src/app/table/TableVirtualscrollTreeComponent';

import { TableVirtualscrollComponent } from './../../../../table/demo/src/app/table/TableVirtualscrollComponent';

import { TagBasicComponent } from './../../../../tag/demo/src/app/tag/TagBasicComponent';

import { TagDefaultComponent } from './../../../../tag/demo/src/app/tag/TagDefaultComponent';

import { TagDisabledComponent } from './../../../../tag/demo/src/app/tag/TagDisabledComponent';

import { TagEditComponent } from './../../../../tag/demo/src/app/tag/TagEditComponent';

import { TagEventsComponent } from './../../../../tag/demo/src/app/tag/TagEventsComponent';

import { TagsinputBasicComponent } from './../../../../tagsinput/demo/src/app/tagsinput/TagsinputBasicComponent';

import { TagsinputDisabledComponent } from './../../../../tagsinput/demo/src/app/tagsinput/TagsinputDisabledComponent';

import { TagsinputEventsComponent } from './../../../../tagsinput/demo/src/app/tagsinput/TagsinputEventsComponent';

import { TagsinputLabelkeyComponent } from './../../../../tagsinput/demo/src/app/tagsinput/TagsinputLabelkeyComponent';

import { TagsinputNullComponent } from './../../../../tagsinput/demo/src/app/tagsinput/TagsinputNullComponent';

import { TagsinputPanelwidthComponent } from './../../../../tagsinput/demo/src/app/tagsinput/TagsinputPanelwidthComponent';

import { TagsinputSeparatorsComponent } from './../../../../tagsinput/demo/src/app/tagsinput/TagsinputSeparatorsComponent';

import { TagsinputReactiveComponent } from './../../../../tagsinput/demo/src/app/tagsinput/TagsinputReactiveComponent';

import { TagsinputSuggestionComponent } from './../../../../tagsinput/demo/src/app/tagsinput/TagsinputSuggestionComponent';

import { TagsinputTemplateComponent } from './../../../../tagsinput/demo/src/app/tagsinput/TagsinputTemplateComponent';

import { TagsinputValidComponent } from './../../../../tagsinput/demo/src/app/tagsinput/TagsinputValidComponent';

import { TagsinputValuekeyComponent } from './../../../../tagsinput/demo/src/app/tagsinput/TagsinputValuekeyComponent';

import { TagsinputMaxlengthComponent } from './../../../../tagsinput/demo/src/app/tagsinput/TagsinputMaxlengthComponent';

import { TextBasicComponent } from './../../../../text/demo/src/app/text/TextBasicComponent';

import { TextClearComponent } from './../../../../text/demo/src/app/text/TextClearComponent';

import { TextDisabledComponent } from './../../../../text/demo/src/app/text/TextDisabledComponent';

import { TextEventsComponent } from './../../../../text/demo/src/app/text/TextEventsComponent';

import { TextFocusComponent } from './../../../../text/demo/src/app/text/TextFocusComponent';

import { TextMaskinputComponent } from './../../../../text/demo/src/app/text/TextMaskinputComponent';

import { TextNoborderTestComponent } from './../../../../text/demo/src/app/text/TextNoborderTestComponent';

import { TextPasswordVisibleComponent } from './../../../../text/demo/src/app/text/TextPasswordVisibleComponent';

import { TextPasswordComponent } from './../../../../text/demo/src/app/text/TextPasswordComponent';

import { TextReactiveComponent } from './../../../../text/demo/src/app/text/TextReactiveComponent';

import { TextReadonlyComponent } from './../../../../text/demo/src/app/text/TextReadonlyComponent';

import { TextareaAutofocusComponent } from './../../../../textarea/demo/src/app/textarea/TextareaAutofocusComponent';

import { TextareaDisabledComponent } from './../../../../textarea/demo/src/app/textarea/TextareaDisabledComponent';

import { TextareaMaxlengthComponent } from './../../../../textarea/demo/src/app/textarea/TextareaMaxlengthComponent';

import { TextareaNoneComponent } from './../../../../textarea/demo/src/app/textarea/TextareaNoneComponent';

import { TextareaResizeComponent } from './../../../../textarea/demo/src/app/textarea/TextareaResizeComponent';

import { TextareaScrollComponent } from './../../../../textarea/demo/src/app/textarea/TextareaScrollComponent';

import { TextareaValidComponent } from './../../../../textarea/demo/src/app/textarea/TextareaValidComponent';

import { TextareaWidthComponent } from './../../../../textarea/demo/src/app/textarea/TextareaWidthComponent';

import { TimeCleariconComponent } from './../../../../time/demo/src/app/time/TimeCleariconComponent';

import { TimeDisabledComponent } from './../../../../time/demo/src/app/time/TimeDisabledComponent';

import { TimeEventComponent } from './../../../../time/demo/src/app/time/TimeEventComponent';

import { TimeFormatComponent } from './../../../../time/demo/src/app/time/TimeFormatComponent';

import { TimeMaxComponent } from './../../../../time/demo/src/app/time/TimeMaxComponent';

import { TimeMaxminComponent } from './../../../../time/demo/src/app/time/TimeMaxminComponent';

import { TimeMinComponent } from './../../../../time/demo/src/app/time/TimeMinComponent';

import { TimeOptionDisabledComponent } from './../../../../time/demo/src/app/time/TimeOptionDisabledComponent';

import { TimePanelalignComponent } from './../../../../time/demo/src/app/time/TimePanelalignComponent';

import { TimeReactiveComponent } from './../../../../time/demo/src/app/time/TimeReactiveComponent';

import { TimeValidationComponent } from './../../../../time/demo/src/app/time/TimeValidationComponent';

import { TimelineBasicComponent } from './../../../../timeline/demo/src/app/timeline/TimelineBasicComponent';

import { TimelineDarkComponent } from './../../../../timeline/demo/src/app/timeline/TimelineDarkComponent';

import { TimelineHelptipComponent } from './../../../../timeline/demo/src/app/timeline/TimelineHelptipComponent';

import { TimelineMultiComponent } from './../../../../timeline/demo/src/app/timeline/TimelineMultiComponent';

import { TimelineTempleteComponent } from './../../../../timeline/demo/src/app/timeline/TimelineTempleteComponent';

import { TimelineTestComponent } from './../../../../timeline/demo/src/app/timeline/TimelineTestComponent';

import { TimelineTypeComponent } from './../../../../timeline/demo/src/app/timeline/TimelineTypeComponent';

import { TipBasicComponent } from './../../../../tip/demo/src/app/tip/TipBasicComponent';

import { TipContentCompComponent } from './../../../../tip/demo/src/app/tip/TipContentCompComponent';

import { TipContentTemplateComponent } from './../../../../tip/demo/src/app/tip/TipContentTemplateComponent';

import { TipEmptyComponent } from './../../../../tip/demo/src/app/tip/TipEmptyComponent';

import { TipHasArrowComponent } from './../../../../tip/demo/src/app/tip/TipHasArrowComponent';

import { TipLongTextPositionComponent } from './../../../../tip/demo/src/app/tip/TipLongTextPositionComponent';

import { TipMaxWidthComponent } from './../../../../tip/demo/src/app/tip/TipMaxWidthComponent';

import { TipPositionTestComponent } from './../../../../tip/demo/src/app/tip/TipPositionTestComponent';

import { TipPositionComponent } from './../../../../tip/demo/src/app/tip/TipPositionComponent';

import { TipServiceDestroyComponent } from './../../../../tip/demo/src/app/tip/TipServiceDestroyComponent';

import { TipServiceComponent } from './../../../../tip/demo/src/app/tip/TipServiceComponent';

import { TipTriggerComponent } from './../../../../tip/demo/src/app/tip/TipTriggerComponent';

import { TipValidPositionTestComponent } from './../../../../tip/demo/src/app/tip/TipValidPositionTestComponent';

import { TipZindexComponent } from './../../../../tip/demo/src/app/tip/TipZindexComponent';

import { TransferBasicComponent } from './../../../../transfer/demo/src/app/transfer/TransferBasicComponent';

import { TransferDisabledComponent } from './../../../../transfer/demo/src/app/transfer/TransferDisabledComponent';

import { TransferEventComponent } from './../../../../transfer/demo/src/app/transfer/TransferEventComponent';

import { TransferIdComponent } from './../../../../transfer/demo/src/app/transfer/TransferIdComponent';

import { TransferIdkeyComponent } from './../../../../transfer/demo/src/app/transfer/TransferIdkeyComponent';

import { TransferLabelkeyComponent } from './../../../../transfer/demo/src/app/transfer/TransferLabelkeyComponent';

import { TransferLazyComponent } from './../../../../transfer/demo/src/app/transfer/TransferLazyComponent';

import { TransferLoadComponent } from './../../../../transfer/demo/src/app/transfer/TransferLoadComponent';

import { TransferNodatatextComponent } from './../../../../transfer/demo/src/app/transfer/TransferNodatatextComponent';

import { TransferPaginationComponent } from './../../../../transfer/demo/src/app/transfer/TransferPaginationComponent';

import { TransferPlaceholderComponent } from './../../../../transfer/demo/src/app/transfer/TransferPlaceholderComponent';

import { TransferSearchableComponent } from './../../../../transfer/demo/src/app/transfer/TransferSearchableComponent';

import { TransferSearchkeysComponent } from './../../../../transfer/demo/src/app/transfer/TransferSearchkeysComponent';

import { TransferSizeComponent } from './../../../../transfer/demo/src/app/transfer/TransferSizeComponent';

import { TransferTableComponent } from './../../../../transfer/demo/src/app/transfer/TransferTableComponent';

import { TransferTitlesComponent } from './../../../../transfer/demo/src/app/transfer/TransferTitlesComponent';

import { TreeBeforeExpandComponent } from './../../../../tree/demo/src/app/tree/TreeBeforeExpandComponent';

import { TreeBeforeMoreComponent } from './../../../../tree/demo/src/app/tree/TreeBeforeMoreComponent';

import { TreeChangedbycheckboxComponent } from './../../../../tree/demo/src/app/tree/TreeChangedbycheckboxComponent';

import { TreeCheckRelationComponent } from './../../../../tree/demo/src/app/tree/TreeCheckRelationComponent';

import { TreeDisabledComponent } from './../../../../tree/demo/src/app/tree/TreeDisabledComponent';

import { TreeDragBeforedropComponent } from './../../../../tree/demo/src/app/tree/TreeDragBeforedropComponent';

import { TreeDragComponent } from './../../../../tree/demo/src/app/tree/TreeDragComponent';

import { TreeEventComponent } from './../../../../tree/demo/src/app/tree/TreeEventComponent';

import { TreeIconComponent } from './../../../../tree/demo/src/app/tree/TreeIconComponent';

import { TreeLoadComponent } from './../../../../tree/demo/src/app/tree/TreeLoadComponent';

import { TreeManyComponent } from './../../../../tree/demo/src/app/tree/TreeManyComponent';

import { TreeMultiselectComponent } from './../../../../tree/demo/src/app/tree/TreeMultiselectComponent';

import { TreeOperateComponent } from './../../../../tree/demo/src/app/tree/TreeOperateComponent';

import { TreeParentcheckableComponent } from './../../../../tree/demo/src/app/tree/TreeParentcheckableComponent';

import { TreeRadioselectComponent } from './../../../../tree/demo/src/app/tree/TreeRadioselectComponent';

import { TreeSearchComponent } from './../../../../tree/demo/src/app/tree/TreeSearchComponent';

import { TreeShortcutkeyComponent } from './../../../../tree/demo/src/app/tree/TreeShortcutkeyComponent';

import { TreeSmallComponent } from './../../../../tree/demo/src/app/tree/TreeSmallComponent';

import { TreeTemplateComponent } from './../../../../tree/demo/src/app/tree/TreeTemplateComponent';

import { TreeUtilComponent } from './../../../../tree/demo/src/app/tree/TreeUtilComponent';

import { TreeVirtualscrollDragComponent } from './../../../../tree/demo/src/app/tree/TreeVirtualscrollDragComponent';

import { TreeVirtualscrollSmallComponent } from './../../../../tree/demo/src/app/tree/TreeVirtualscrollSmallComponent';

import { TreeVirtualscrollComponent } from './../../../../tree/demo/src/app/tree/TreeVirtualscrollComponent';

import { TreeselectBasicComponent } from './../../../../treeselect/demo/src/app/treeselect/TreeselectBasicComponent';

import { TreeselectBeforeExpandComponent } from './../../../../treeselect/demo/src/app/treeselect/TreeselectBeforeExpandComponent';

import { TreeselectBeforeMoreComponent } from './../../../../treeselect/demo/src/app/treeselect/TreeselectBeforeMoreComponent';

import { TreeselectClearableComponent } from './../../../../treeselect/demo/src/app/treeselect/TreeselectClearableComponent';

import { TreeselectDisabledComponent } from './../../../../treeselect/demo/src/app/treeselect/TreeselectDisabledComponent';

import { TreeselectDropmaxheightComponent } from './../../../../treeselect/demo/src/app/treeselect/TreeselectDropmaxheightComponent';

import { TreeselectEventComponent } from './../../../../treeselect/demo/src/app/treeselect/TreeselectEventComponent';

import { TreeselectFocusComponent } from './../../../../treeselect/demo/src/app/treeselect/TreeselectFocusComponent';

import { TreeselectLabelkeyComponent } from './../../../../treeselect/demo/src/app/treeselect/TreeselectLabelkeyComponent';

import { TreeselectLazyloadComponent } from './../../../../treeselect/demo/src/app/treeselect/TreeselectLazyloadComponent';

import { TreeselectLoadComponent } from './../../../../treeselect/demo/src/app/treeselect/TreeselectLoadComponent';

import { TreeselectMaxlineComponent } from './../../../../treeselect/demo/src/app/treeselect/TreeselectMaxlineComponent';

import { TreeselectModalComponent } from './../../../../treeselect/demo/src/app/treeselect/TreeselectModalComponent';

import { TreeselectMultiComponent } from './../../../../treeselect/demo/src/app/treeselect/TreeselectMultiComponent';

import { TreeselectNodataComponent } from './../../../../treeselect/demo/src/app/treeselect/TreeselectNodataComponent';

import { TreeselectOptionsChangeComponent } from './../../../../treeselect/demo/src/app/treeselect/TreeselectOptionsChangeComponent';

import { TreeselectPanelwidthComponent } from './../../../../treeselect/demo/src/app/treeselect/TreeselectPanelwidthComponent';

import { TreeselectSearchComponent } from './../../../../treeselect/demo/src/app/treeselect/TreeselectSearchComponent';

import { TreeselectSelectallComponent } from './../../../../treeselect/demo/src/app/treeselect/TreeselectSelectallComponent';

import { TreeselectValidationComponent } from './../../../../treeselect/demo/src/app/treeselect/TreeselectValidationComponent';

import { UploadAutoUploadComponent } from './../../../../upload/demo/src/app/upload/UploadAutoUploadComponent';

import { UploadBasicComponent } from './../../../../upload/demo/src/app/upload/UploadBasicComponent';

import { UploadBatchSendComponent } from './../../../../upload/demo/src/app/upload/UploadBatchSendComponent';

import { UploadBeforeremoveComponent } from './../../../../upload/demo/src/app/upload/UploadBeforeremoveComponent';

import { UploadButtonTestComponent } from './../../../../upload/demo/src/app/upload/UploadButtonTestComponent';

import { UploadButtonComponent } from './../../../../upload/demo/src/app/upload/UploadButtonComponent';

import { UploadCaseTestComponent } from './../../../../upload/demo/src/app/upload/UploadCaseTestComponent';

import { UploadChangesComponent } from './../../../../upload/demo/src/app/upload/UploadChangesComponent';

import { UploadChunksizeComponent } from './../../../../upload/demo/src/app/upload/UploadChunksizeComponent';

import { UploadCustomComponent } from './../../../../upload/demo/src/app/upload/UploadCustomComponent';

import { UploadEventComponent } from './../../../../upload/demo/src/app/upload/UploadEventComponent';

import { UploadFilterComponent } from './../../../../upload/demo/src/app/upload/UploadFilterComponent';

import { UploadFormDataComponent } from './../../../../upload/demo/src/app/upload/UploadFormDataComponent';

import { UploadInitfilesTestComponent } from './../../../../upload/demo/src/app/upload/UploadInitfilesTestComponent';

import { UploadInputFieldTestComponent } from './../../../../upload/demo/src/app/upload/UploadInputFieldTestComponent';

import { UploadPropsComponent } from './../../../../upload/demo/src/app/upload/UploadPropsComponent';

import { UploadServiceTestComponent } from './../../../../upload/demo/src/app/upload/UploadServiceTestComponent';

import { UploadServiceComponent } from './../../../../upload/demo/src/app/upload/UploadServiceComponent';

import { UploadSingleComponent } from './../../../../upload/demo/src/app/upload/UploadSingleComponent';

import { UploadimageAutoUploadComponent } from './../../../../upload/demo/src/app/uploadimage/UploadimageAutoUploadComponent';

import { UploadimageBasicComponent } from './../../../../upload/demo/src/app/uploadimage/UploadimageBasicComponent';

import { UploadimageChangesComponent } from './../../../../upload/demo/src/app/uploadimage/UploadimageChangesComponent';

import { UploadimageDeletableComponent } from './../../../../upload/demo/src/app/uploadimage/UploadimageDeletableComponent';

import { UploadimageDisabledComponent } from './../../../../upload/demo/src/app/uploadimage/UploadimageDisabledComponent';

import { UploadimageDragComponent } from './../../../../upload/demo/src/app/uploadimage/UploadimageDragComponent';

import { UploadimageEventComponent } from './../../../../upload/demo/src/app/uploadimage/UploadimageEventComponent';

import { UploadimageFilterComponent } from './../../../../upload/demo/src/app/uploadimage/UploadimageFilterComponent';

import { UploadimageInitfilesComponent } from './../../../../upload/demo/src/app/uploadimage/UploadimageInitfilesComponent';

import { UploadimageMaxcountComponent } from './../../../../upload/demo/src/app/uploadimage/UploadimageMaxcountComponent';

import { UploadimageTemplateComponent } from './../../../../upload/demo/src/app/uploadimage/UploadimageTemplateComponent';

import { BrowserUsageComponent } from './../../../../utils/demo/src/app/browser/BrowserUsageComponent';

import { KeymapUsageComponent } from './../../../../utils/demo/src/app/keymap/KeymapUsageComponent';

import { LogUsageComponent } from './../../../../utils/demo/src/app/log/LogUsageComponent';

import { ThemeBasicComponent } from './../../../../utils/demo/src/app/theme/ThemeBasicComponent';

import { ThemePaletteComponent } from './../../../../utils/demo/src/app/theme/ThemePaletteComponent';

import { ValidationAsyncCheckTestComponent } from './../../../../validation/demo/src/app/validation/ValidationAsyncCheckTestComponent';

import { ValidationAsyncCheckComponent } from './../../../../validation/demo/src/app/validation/ValidationAsyncCheckComponent';

import { ValidationBasicControlComponent } from './../../../../validation/demo/src/app/validation/ValidationBasicControlComponent';

import { ValidationBasicDirectiveComponent } from './../../../../validation/demo/src/app/validation/ValidationBasicDirectiveComponent';

import { ValidationBlurCheckComponent } from './../../../../validation/demo/src/app/validation/ValidationBlurCheckComponent';

import { ValidationErrorMsgComponent } from './../../../../validation/demo/src/app/validation/ValidationErrorMsgComponent';

import { ValidationFormGroupConfigComponent } from './../../../../validation/demo/src/app/validation/ValidationFormGroupConfigComponent';

import { ValidationFormGroupTestComponent } from './../../../../validation/demo/src/app/validation/ValidationFormGroupTestComponent';

import { ValidationFormGroupComponent } from './../../../../validation/demo/src/app/validation/ValidationFormGroupComponent';

import { ValidationParamChangeComponent } from './../../../../validation/demo/src/app/validation/ValidationParamChangeComponent';

import { ValidationPwdCheckComponent } from './../../../../validation/demo/src/app/validation/ValidationPwdCheckComponent';

import { ValidationRulesCustomDirectiveComponent } from './../../../../validation/demo/src/app/validation/ValidationRulesCustomDirectiveComponent';

import { ValidationRulesCustomComponent } from './../../../../validation/demo/src/app/validation/ValidationRulesCustomComponent';

import { ValidationRulesTestComponent } from './../../../../validation/demo/src/app/validation/ValidationRulesTestComponent';

import { ValidationTemplateFormNestedComponent } from './../../../../validation/demo/src/app/validation/ValidationTemplateFormNestedComponent';

import { ValidationTipComponent } from './../../../../validation/demo/src/app/validation/ValidationTipComponent';

import { ValidationTiscrollComponent } from './../../../../validation/demo/src/app/validation/ValidationTiscrollComponent';

@Component({
  selector: `app-root`,
  template: ``
})
export class AppComponent {}

const WCS: any = [
  {
    selector: 'website-tiny-accordion-basic',
    component: AccordionBasicComponent
  },

  {
    selector: 'website-tiny-accordion-class',
    component: AccordionClassComponent
  },

  {
    selector: 'website-tiny-accordion-click-toggle',
    component: AccordionClickToggleComponent
  },

  {
    selector: 'website-tiny-accordion-close-others',
    component: AccordionCloseOthersComponent
  },

  {
    selector: 'website-tiny-accordion-disabled',
    component: AccordionDisabledComponent
  },

  {
    selector: 'website-tiny-accordion-open',
    component: AccordionOpenComponent
  },

  {
    selector: 'website-tiny-actionmenu-basic',
    component: ActionmenuBasicComponent
  },

  {
    selector: 'website-tiny-actionmenu-data',
    component: ActionmenuDataComponent
  },

  {
    selector: 'website-tiny-actionmenu-data2',
    component: ActionmenuData2Component
  },

  {
    selector: 'website-tiny-actionmenu-disabled',
    component: ActionmenuDisabledComponent
  },

  {
    selector: 'website-tiny-actionmenu-divider',
    component: ActionmenuDividerComponent
  },

  {
    selector: 'website-tiny-actionmenu-event',
    component: ActionmenuEventComponent
  },

  {
    selector: 'website-tiny-actionmenu-focus',
    component: ActionmenuFocusComponent
  },

  { selector: 'website-tiny-actionmenu-id', component: ActionmenuIdComponent },

  {
    selector: 'website-tiny-actionmenu-items-change',
    component: ActionmenuItemsChangeComponent
  },

  {
    selector: 'website-tiny-actionmenu-items',
    component: ActionmenuItemsComponent
  },

  {
    selector: 'website-tiny-actionmenu-labelkey',
    component: ActionmenuLabelkeyComponent
  },

  {
    selector: 'website-tiny-actionmenu-many',
    component: ActionmenuManyComponent
  },

  {
    selector: 'website-tiny-actionmenu-menutext',
    component: ActionmenuMenutextComponent
  },

  {
    selector: 'website-tiny-actionmenu-panelstyle',
    component: ActionmenuPanelstyleComponent
  },

  {
    selector: 'website-tiny-actionmenu-shownum',
    component: ActionmenuShownumComponent
  },

  {
    selector: 'website-tiny-actionmenu-space',
    component: ActionmenuSpaceComponent
  },

  {
    selector: 'website-tiny-actionmenu-table',
    component: ActionmenuTableComponent
  },

  {
    selector: 'website-tiny-actionmenu-templete-test',
    component: ActionmenuTempleteTestComponent
  },

  {
    selector: 'website-tiny-actionmenu-templete',
    component: ActionmenuTempleteComponent
  },

  {
    selector: 'website-tiny-actionmenu-tips-test',
    component: ActionmenuTipsTestComponent
  },

  {
    selector: 'website-tiny-actionmenu-tips',
    component: ActionmenuTipsComponent
  },

  {
    selector: 'website-tiny-alert-boxshadow',
    component: AlertBoxshadowComponent
  },

  {
    selector: 'website-tiny-alert-darktheme',
    component: AlertDarkthemeComponent
  },

  { selector: 'website-tiny-alert-dismiss', component: AlertDismissComponent },

  { selector: 'website-tiny-alert-event', component: AlertEventComponent },

  { selector: 'website-tiny-alert-icon', component: AlertIconComponent },

  {
    selector: 'website-tiny-alert-messages',
    component: AlertMessagesComponent
  },

  {
    selector: 'website-tiny-alert-open-test',
    component: AlertOpenTestComponent
  },

  { selector: 'website-tiny-alert-open', component: AlertOpenComponent },

  { selector: 'website-tiny-alert-size', component: AlertSizeComponent },

  {
    selector: 'website-tiny-alert-trigger-scroll',
    component: AlertTriggerScrollComponent
  },

  { selector: 'website-tiny-alert-type', component: AlertTypeComponent },

  { selector: 'website-tiny-anchor-basic', component: AnchorBasicComponent },

  { selector: 'website-tiny-anchor-events', component: AnchorEventsComponent },

  { selector: 'website-tiny-anchor-id', component: AnchorIdComponent },

  { selector: 'website-tiny-anchor-items', component: AnchorItemsComponent },

  {
    selector: 'website-tiny-anchor-offsettop',
    component: AnchorOffsettopComponent
  },

  {
    selector: 'website-tiny-anchor-scrolltarget',
    component: AnchorScrolltargetComponent
  },

  { selector: 'website-tiny-anchor-speed', component: AnchorSpeedComponent },

  {
    selector: 'website-tiny-anchor-template',
    component: AnchorTemplateComponent
  },

  { selector: 'website-tiny-anchor-test', component: AnchorTestComponent },

  {
    selector: 'website-tiny-autocomplete-appendtobody',
    component: AutocompleteAppendtobodyComponent
  },

  {
    selector: 'website-tiny-autocomplete-basic',
    component: AutocompleteBasicComponent
  },

  {
    selector: 'website-tiny-autocomplete-clearable',
    component: AutocompleteClearableComponent
  },

  {
    selector: 'website-tiny-autocomplete-disabled',
    component: AutocompleteDisabledComponent
  },

  {
    selector: 'website-tiny-autocomplete-events',
    component: AutocompleteEventsComponent
  },

  {
    selector: 'website-tiny-autocomplete-labelkey',
    component: AutocompleteLabelkeyComponent
  },

  {
    selector: 'website-tiny-autocomplete-maxlength',
    component: AutocompleteMaxlengthComponent
  },

  {
    selector: 'website-tiny-autocomplete-panel-size',
    component: AutocompletePanelSizeComponent
  },

  {
    selector: 'website-tiny-autocomplete-template',
    component: AutocompleteTemplateComponent
  },

  {
    selector: 'website-tiny-autocomplete-test',
    component: AutocompleteTestComponent
  },

  {
    selector: 'website-tiny-autocomplete-tip',
    component: AutocompleteTipComponent
  },

  {
    selector: 'website-tiny-autocomplete-valid',
    component: AutocompleteValidComponent
  },

  { selector: 'website-tiny-autocomplete-group', component: AutocompleteGroupComponent },

  { selector: 'website-tiny-autocomplete-suggest', component: AutocompleteSuggestComponent },

  {
    selector: 'website-tiny-avatar-image-error-test',
    component: AvatarImageErrorTestComponent
  },

  { selector: 'website-tiny-avatar-image', component: AvatarImageComponent },

  { selector: 'website-tiny-avatar-shape', component: AvatarShapeComponent },

  { selector: 'website-tiny-avatar-size', component: AvatarSizeComponent },

  { selector: 'website-tiny-avatar-style', component: AvatarStyleComponent },

  { selector: 'website-tiny-avatar-text', component: AvatarTextComponent },

  { selector: 'website-tiny-button-color', component: ButtonColorComponent },

  {
    selector: 'website-tiny-button-disabled',
    component: ButtonDisabledComponent
  },

  { selector: 'website-tiny-button-event', component: ButtonEventComponent },

  { selector: 'website-tiny-button-focus', component: ButtonFocusComponent },

  {
    selector: 'website-tiny-button-hasborder-test',
    component: ButtonHasborderTestComponent
  },

  {
    selector: 'website-tiny-button-hasborder',
    component: ButtonHasborderComponent
  },

  { selector: 'website-tiny-button-icon', component: ButtonIconComponent },

  {
    selector: 'website-tiny-button-label',
    component: ButtonLabelComponent
  },

  {
    selector: 'website-tiny-button-loading',
    component: ButtonLoadingComponent
  },

  {
    selector: 'website-tiny-button-onlyicon',
    component: ButtonOnlyiconComponent
  },

  { selector: 'website-tiny-button-size', component: ButtonSizeComponent },

  { selector: 'website-tiny-button-tip', component: ButtonTipComponent },

  {
    selector: 'website-tiny-buttongroup-activeclass',
    component: ButtongroupActiveclassComponent
  },

  {
    selector: 'website-tiny-buttongroup-beforeclick',
    component: ButtongroupBeforeclickComponent
  },

  {
    selector: 'website-tiny-buttongroup-deselectable',
    component: ButtongroupDeselectableComponent
  },

  {
    selector: 'website-tiny-buttongroup-disabled',
    component: ButtongroupDisabledComponent
  },

  {
    selector: 'website-tiny-buttongroup-enum',
    component: ButtongroupEnumComponent
  },

  {
    selector: 'website-tiny-buttongroup-event',
    component: ButtongroupEventComponent
  },

  {
    selector: 'website-tiny-buttongroup-focus',
    component: ButtongroupFocusComponent
  },

  {
    selector: 'website-tiny-buttongroup-id-test',
    component: ButtongroupIdTestComponent
  },

  {
    selector: 'website-tiny-buttongroup-id',
    component: ButtongroupIdComponent
  },

  {
    selector: 'website-tiny-buttongroup-items-test',
    component: ButtongroupItemsTestComponent
  },

  {
    selector: 'website-tiny-buttongroup-items',
    component: ButtongroupItemsComponent
  },

  {
    selector: 'website-tiny-buttongroup-many',
    component: ButtongroupManyComponent
  },

  {
    selector: 'website-tiny-buttongroup-minwidth',
    component: ButtongroupMinwidthComponent
  },

  {
    selector: 'website-tiny-buttongroup-multi-type',
    component: ButtongroupMultiTypeComponent
  },

  {
    selector: 'website-tiny-buttongroup-multiline',
    component: ButtongroupMultilineComponent
  },

  {
    selector: 'website-tiny-buttongroup-multiple',
    component: ButtongroupMultipleComponent
  },

  {
    selector: 'website-tiny-buttongroup-radio-type',
    component: ButtongroupRadioTypeComponent
  },

  {
    selector: 'website-tiny-buttongroup-reactive-forms',
    component: ButtongroupReactiveFormsComponent
  },

  {
    selector: 'website-tiny-buttongroup-sup-test',
    component: ButtongroupSupTestComponent
  },

  {
    selector: 'website-tiny-buttongroup-sup',
    component: ButtongroupSupComponent
  },

  {
    selector: 'website-tiny-buttongroup-template',
    component: ButtongroupTemplateComponent
  },

  {
    selector: 'website-tiny-buttongroup-tip',
    component: ButtongroupTipComponent
  },

  {
    selector: 'website-tiny-buttongroup-valuekey-test',
    component: ButtongroupValuekeyTestComponent
  },

  {
    selector: 'website-tiny-buttongroup-valuekey',
    component: ButtongroupValuekeyComponent
  },

  {
    selector: 'website-tiny-buttonselect-basic',
    component: ButtonselectBasicComponent
  },

  {
    selector: 'website-tiny-buttonselect-labelkey',
    component: ButtonselectLabelkeyComponent
  },

  { selector: 'website-tiny-card-add', component: CardAddComponent },

  { selector: 'website-tiny-card-basic', component: CardBasicComponent },

  { selector: 'website-tiny-card-grid', component: CardGridComponent },

  { selector: 'website-tiny-card-grid2', component: CardGrid2Component },

  { selector: 'website-tiny-card-header', component: CardHeaderComponent },

  {
    selector: 'website-tiny-cascader-basic',
    component: CascaderBasicComponent
  },

  {
    selector: 'website-tiny-cascader-clearable',
    component: CascaderClearableComponent
  },

  {
    selector: 'website-tiny-cascader-disabled',
    component: CascaderDisabledComponent
  },

  {
    selector: 'website-tiny-cascader-events',
    component: CascaderEventsComponent
  },

  {
    selector: 'website-tiny-cascader-idkey',
    component: CascaderIdkeyComponent
  },

  {
    selector: 'website-tiny-cascader-item-test',
    component: CascaderItemTestComponent
  },

  {
    selector: 'website-tiny-cascader-labelkey',
    component: CascaderLabelkeyComponent
  },

  {
    selector: 'website-tiny-cascader-onlyselectleaf',
    component: CascaderOnlyselectleafComponent
  },

  {
    selector: 'website-tiny-cascader-panel',
    component: CascaderPanelComponent
  },

  {
    selector: 'website-tiny-cascader-search',
    component: CascaderSearchComponent
  },

  {
    selector: 'website-tiny-cascader-showalllevel',
    component: CascaderShowalllevelComponent
  },

  {
    selector: 'website-tiny-cascader-trigger',
    component: CascaderTriggerComponent
  },

  {
    selector: 'website-tiny-cascader-valid',
    component: CascaderValidComponent
  },

  {
    selector: 'website-tiny-cascader-valuekey',
    component: CascaderValuekeyComponent
  },

  {
    selector: 'website-tiny-checkbox-basic',
    component: CheckboxBasicComponent
  },

  {
    selector: 'website-tiny-checkbox-disabled',
    component: CheckboxDisabledComponent
  },

  {
    selector: 'website-tiny-checkbox-event',
    component: CheckboxEventComponent
  },

  {
    selector: 'website-tiny-checkbox-focused',
    component: CheckboxFocusedComponent
  },

  {
    selector: 'website-tiny-checkbox-group',
    component: CheckboxGroupComponent
  },

  {
    selector: 'website-tiny-checkbox-group-direction',
    component: CheckboxGroupDirectionComponent
  },

  {
    selector: 'website-tiny-checkbox-group-labelkey',
    component: CheckboxGroupLabelkeyComponent
  },

  {
    selector: 'website-tiny-checkbox-group-level',
    component: CheckboxGroupLevelComponent
  },

  {
    selector: 'website-tiny-checkbox-group-linewrap',
    component: CheckboxGroupLinewrapComponent
  },

  {
    selector: 'website-tiny-checkbox-group-validation',
    component: CheckboxGroupValidationComponent
  },

  {
    selector: 'website-tiny-checkbox-group-valuekey',
    component: CheckboxGroupValuekeyComponent
  },

  {
    selector: 'website-tiny-checkbox-indeterminate',
    component: CheckboxIndeterminateComponent
  },

  {
    selector: 'website-tiny-checkbox-label',
    component: CheckboxLabelComponent
  },

  {
    selector: 'website-tiny-collapse-basic',
    component: CollapseBasicComponent
  },

  {
    selector: 'website-tiny-collapse-event',
    component: CollapseEventComponent
  },

  {
    selector: 'website-tiny-collapsebox-basic',
    component: CollapseboxBasicComponent
  },

  {
    selector: 'website-tiny-collapsebox-closeable',
    component: CollapseboxCloseableComponent
  },

  {
    selector: 'website-tiny-collapsebox-event',
    component: CollapseboxEventComponent
  },

  {
    selector: 'website-tiny-collapsebutton-basic',
    component: CollapsebuttonBasicComponent
  },
  {
    selector: 'website-tiny-collapsebutton-customtext',
    component: CollapsebuttonCustomtextComponent
  },
  {
    selector: 'website-tiny-collapsebutton-searchcount',
    component: CollapsebuttonSearchcountComponent
  },
  {
    selector: 'website-tiny-collapsebutton-event',
    component: CollapsebuttonEventComponent
  },

  { selector: 'website-tiny-collapsetext-basic', component: CollapsetextBasicComponent },

  { selector: 'website-tiny-collapsetext-type', component: CollapsetextTypeComponent },

  { selector: 'website-tiny-collapsetext-highlight', component: CollapsetextHighlightComponent },

  { selector: 'website-tiny-collapsetext-collapsed', component: CollapsetextCollapsedComponent },

  { selector: 'website-tiny-collapsetext-scene', component: CollapsetextSceneComponent },

  {
    selector: 'website-tiny-copy-basic',
    component: CopyBasicComponent
  },
  {
    selector: 'website-tiny-copy-dark',
    component: CopyDarkComponent
  },
  {
    selector: 'website-tiny-copy-tip',
    component: CopyTipComponent
  },
  {
    selector: 'website-tiny-copy-table',
    component: CopyTableComponent
  },
  {
    selector: 'website-tiny-copy-event',
    component: CopyEventComponent
  },

  { selector: 'website-tiny-crumb-basic', component: CrumbBasicComponent },

  { selector: 'website-tiny-crumb-events', component: CrumbEventsComponent },

  { selector: 'website-tiny-crumb-href', component: CrumbHrefComponent },

  {
    selector: 'website-tiny-crumb-router-test',
    component: CrumbRouterTestComponent
  },

  { selector: 'website-tiny-crumb-router', component: CrumbRouterComponent },

  {
    selector: 'website-tiny-date-clearicon',
    component: DateCleariconComponent
  },

  {
    selector: 'website-tiny-date-customize',
    component: DateCustomizeComponent
  },

  { selector: 'website-tiny-date-disabled', component: DateDisabledComponent },

  {
    selector: 'website-tiny-date-disableddays',
    component: DateDisableddaysComponent
  },

  { selector: 'website-tiny-date-event', component: DateEventComponent },

  { selector: 'website-tiny-date-form', component: DateFormComponent },

  {
    selector: 'website-tiny-date-format-test',
    component: DateFormatTestComponent
  },

  { selector: 'website-tiny-date-format', component: DateFormatComponent },

  { selector: 'website-tiny-date-max', component: DateMaxComponent },

  {
    selector: 'website-tiny-date-maxmin-test',
    component: DateMaxminTestComponent
  },

  { selector: 'website-tiny-date-maxmin', component: DateMaxminComponent },

  { selector: 'website-tiny-date-min', component: DateMinComponent },

  {
    selector: 'website-tiny-date-nowdatetime',
    component: DateNowdatetimeComponent
  },

  {
    selector: 'website-tiny-date-panelalign',
    component: DatePanelalignComponent
  },

  {
    selector: 'website-tiny-date-validation',
    component: DateValidationComponent
  },

  {
    selector: 'website-tiny-date-value-test',
    component: DateValueTestComponent
  },

  { selector: 'website-tiny-date-value', component: DateValueComponent },

  {
    selector: 'website-tiny-daterange-customize',
    component: DaterangeCustomizeComponent
  },

  {
    selector: 'website-tiny-daterange-disabled',
    component: DaterangeDisabledComponent
  },

  {
    selector: 'website-tiny-daterange-disableddays',
    component: DaterangeDisableddaysComponent
  },

  {
    selector: 'website-tiny-daterange-event',
    component: DaterangeEventComponent
  },

  {
    selector: 'website-tiny-daterange-fixedvalue-test',
    component: DaterangeFixedvalueTestComponent
  },

  {
    selector: 'website-tiny-daterange-fixedvalue',
    component: DaterangeFixedvalueComponent
  },

  {
    selector: 'website-tiny-daterange-format-test',
    component: DaterangeFormatTestComponent
  },

  {
    selector: 'website-tiny-daterange-format',
    component: DaterangeFormatComponent
  },

  {
    selector: 'website-tiny-daterange-isallowbeginequalend',
    component: DaterangeIsallowbeginequalendComponent
  },

  { selector: 'website-tiny-daterange-max', component: DaterangeMaxComponent },

  {
    selector: 'website-tiny-daterange-maxmin-test',
    component: DaterangeMaxminTestComponent
  },

  {
    selector: 'website-tiny-daterange-maxmin',
    component: DaterangeMaxminComponent
  },

  { selector: 'website-tiny-daterange-min', component: DaterangeMinComponent },

  {
    selector: 'website-tiny-daterange-nowdatetime',
    component: DaterangeNowdatetimeComponent
  },

  {
    selector: 'website-tiny-daterange-panelalign',
    component: DaterangePanelalignComponent
  },

  {
    selector: 'website-tiny-daterange-validation',
    component: DaterangeValidationComponent
  },

  {
    selector: 'website-tiny-daterange-value-test',
    component: DaterangeValueTestComponent
  },

  {
    selector: 'website-tiny-daterange-value',
    component: DaterangeValueComponent
  },

  {
    selector: 'website-tiny-datetime-clearicon',
    component: DatetimeCleariconComponent
  },

  {
    selector: 'website-tiny-datetime-customize',
    component: DatetimeCustomizeComponent
  },

  {
    selector: 'website-tiny-datetime-disabled',
    component: DatetimeDisabledComponent
  },

  {
    selector: 'website-tiny-datetime-event',
    component: DatetimeEventComponent
  },

  {
    selector: 'website-tiny-datetime-format-test',
    component: DatetimeFormatTestComponent
  },

  {
    selector: 'website-tiny-datetime-format',
    component: DatetimeFormatComponent
  },

  { selector: 'website-tiny-datetime-max', component: DatetimeMaxComponent },

  {
    selector: 'website-tiny-datetime-maxmin-test',
    component: DatetimeMaxminTestComponent
  },

  {
    selector: 'website-tiny-datetime-maxmin',
    component: DatetimeMaxminComponent
  },

  { selector: 'website-tiny-datetime-min', component: DatetimeMinComponent },

  {
    selector: 'website-tiny-datetime-nowdatetime',
    component: DatetimeNowdatetimeComponent
  },

  {
    selector: 'website-tiny-datetime-panelalign',
    component: DatetimePanelalignComponent
  },

  {
    selector: 'website-tiny-datetime-validation',
    component: DatetimeValidationComponent
  },

  {
    selector: 'website-tiny-datetime-value-test',
    component: DatetimeValueTestComponent
  },

  {
    selector: 'website-tiny-datetime-value',
    component: DatetimeValueComponent
  },

  { selector: 'website-tiny-datetime-timezoneable', component: DatetimeTimezoneableComponent },

  {
    selector: 'website-tiny-datetimerange-clearicon',
    component: DatetimerangeCleariconComponent
  },

  {
    selector: 'website-tiny-datetimerange-customize',
    component: DatetimerangeCustomizeComponent
  },

  {
    selector: 'website-tiny-datetimerange-disabled',
    component: DatetimerangeDisabledComponent
  },

  {
    selector: 'website-tiny-datetimerange-event',
    component: DatetimerangeEventComponent
  },

  {
    selector: 'website-tiny-datetimerange-format-test',
    component: DatetimerangeFormatTestComponent
  },

  {
    selector: 'website-tiny-datetimerange-format',
    component: DatetimerangeFormatComponent
  },

  {
    selector: 'website-tiny-datetimerange-isallowbeginequalend',
    component: DatetimerangeIsallowbeginequalendComponent
  },

  {
    selector: 'website-tiny-datetimerange-many-test',
    component: DatetimerangeManyTestComponent
  },

  {
    selector: 'website-tiny-datetimerange-max',
    component: DatetimerangeMaxComponent
  },

  {
    selector: 'website-tiny-datetimerange-maxmin-test',
    component: DatetimerangeMaxminTestComponent
  },

  {
    selector: 'website-tiny-datetimerange-maxmin',
    component: DatetimerangeMaxminComponent
  },

  {
    selector: 'website-tiny-datetimerange-min',
    component: DatetimerangeMinComponent
  },

  {
    selector: 'website-tiny-datetimerange-nowdatetime',
    component: DatetimerangeNowdatetimeComponent
  },

  {
    selector: 'website-tiny-datetimerange-panelalign',
    component: DatetimerangePanelalignComponent
  },

  {
    selector: 'website-tiny-datetimerange-timezoneable',
    component: DatetimerangeTimezoneableComponent
  },

  {
    selector: 'website-tiny-datetimerange-validation',
    component: DatetimerangeValidationComponent
  },

  {
    selector: 'website-tiny-datetimerange-value-test',
    component: DatetimerangeValueTestComponent
  },

  {
    selector: 'website-tiny-datetimerange-value',
    component: DatetimerangeValueComponent
  },

  {
    selector: 'website-tiny-formfield-colspan-rowspan-test',
    component: FormfieldColspanRowspanTestComponent
  },

  { selector: 'website-tiny-guides-basic', component: GuidesBasicComponent },

  { selector: 'website-tiny-guides-tab', component: GuidesTabComponent },

  {
    selector: 'website-tiny-guides-guidesteps',
    component: GuidesGuidestepsComponent
  },

  { selector: 'website-tiny-guides-type', component: GuidesTypeComponent },

  {
    selector: 'website-tiny-formfield-colspan-rowspan',
    component: FormfieldColspanRowspanComponent
  },

  {
    selector: 'website-tiny-formfield-colswidth',
    component: FormfieldColswidthComponent
  },

  { selector: 'website-tiny-formfield-foo', component: FormfieldFooComponent },

  {
    selector: 'website-tiny-formfield-index',
    component: FormfieldIndexComponent
  },

  {
    selector: 'website-tiny-formfield-label',
    component: FormfieldLabelComponent
  },

  {
    selector: 'website-tiny-formfield-labelwidth',
    component: FormfieldLabelwidthComponent
  },

  {
    selector: 'website-tiny-formfield-multi-column',
    component: FormfieldMultiColumnComponent
  },

  {
    selector: 'website-tiny-formfield-nest-formfiled',
    component: FormfieldNestFormfiledComponent
  },

  {
    selector: 'website-tiny-formfield-ngfor-test',
    component: FormfieldNgforTestComponent
  },

  {
    selector: 'website-tiny-formfield-required',
    component: FormfieldRequiredComponent
  },

  {
    selector: 'website-tiny-formfield-requiredspace',
    component: FormfieldRequiredspaceComponent
  },

  {
    selector: 'website-tiny-formfield-show',
    component: FormfieldShowComponent
  },

  {
    selector: 'website-tiny-formfield-single-column',
    component: FormfieldSingleColumnComponent
  },

  {
    selector: 'website-tiny-formfield-test',
    component: FormfieldTestComponent
  },

  {
    selector: 'website-tiny-formfield-text-form',
    component: FormfieldTextFormComponent
  },

  {
    selector: 'website-tiny-formfield-vertical-align',
    component: FormfieldVerticalAlignComponent
  },

  {
    selector: 'website-tiny-formfield-vertical',
    component: FormfieldVerticalComponent
  },

  {
    selector: 'website-tiny-foldtext-basic',
    component: FoldtextBasicComponent
  },

  {
    selector: 'website-tiny-foldtext-table',
    component: FoldtextTableComponent
  },

  {
    selector: 'website-tiny-guidesteps-basic',
    component: GuidestepsBasicComponent
  },

  {
    selector: 'website-tiny-guidesteps-iscomplete',
    component: GuidestepsIscompleteComponent
  },

  {
    selector: 'website-tiny-guidesteps-large',
    component: GuidestepsLargeComponent
  },

  {
    selector: 'website-tiny-halfmodal-async',
    component: HalfmodalAsyncComponent
  },

  {
    selector: 'website-tiny-halfmodal-backdrop',
    component: HalfmodalBackdropComponent
  },

  {
    selector: 'website-tiny-halfmodal-basic',
    component: HalfmodalBasicComponent
  },

  {
    selector: 'website-tiny-halfmodal-beforehide',
    component: HalfmodalBeforehideComponent
  },

  {
    selector: 'website-tiny-halfmodal-content',
    component: HalfmodalContentComponent
  },

  {
    selector: 'website-tiny-halfmodal-modal',
    component: HalfmodalModalComponent
  },

  {
    selector: 'website-tiny-halfmodal-modalselect',
    component: HalfmodalModalselectComponent
  },

  {
    selector: 'website-tiny-halfmodal-multi',
    component: HalfmodalMultiComponent
  },

  {
    selector: 'website-tiny-halfmodal-service-test',
    component: HalfmodalServiceTestComponent
  },

  {
    selector: 'website-tiny-halfmodal-service',
    component: HalfmodalServiceComponent
  },

  { selector: 'website-tiny-icon-basic', component: IconBasicComponent },

  { selector: 'website-tiny-svg-setpath', component: SvgSetpathComponent },

  { selector: 'website-tiny-icon-show', component: IconShowComponent },

  { selector: 'website-tiny-iconaction-basic', component: IconactionBasicComponent },

  { selector: 'website-tiny-iconaction-dark', component: IconactionDarkComponent },

  { selector: 'website-tiny-iconaction-disabled', component: IconactionDisabledComponent },

  { selector: 'website-tiny-iconaction-href', component: IconactionHrefComponent },

  {
    selector: 'website-tiny-imagepreview-basic',
    component: ImagepreviewBasicComponent
  },

  {
    selector: 'website-tiny-inputnumber-basic',
    component: InputnumberBasicComponent
  },

  {
    selector: 'website-tiny-inputnumber-event',
    component: InputnumberEventComponent
  },

  {
    selector: 'website-tiny-inputnumber-focus',
    component: InputnumberFocusComponent
  },

  {
    selector: 'website-tiny-inputnumber-format',
    component: InputnumberFormatComponent
  },

  {
    selector: 'website-tiny-inputnumber-load',
    component: InputnumberLoadComponent
  },

  {
    selector: 'website-tiny-inputnumber-localeable',
    component: InputnumberLocaleableComponent
  },

  {
    selector: 'website-tiny-inputnumber-maxlength',
    component: InputnumberMaxlengthComponent
  },

  { selector: 'website-tiny-intro-basic', component: IntroBasicComponent },

  { selector: 'website-tiny-intro-event', component: IntroEventComponent },

  { selector: 'website-tiny-intro-modal', component: IntroModalComponent },

  {
    selector: 'website-tiny-intro-skipable',
    component: IntroSkipableComponent
  },

  {
    selector: 'website-tiny-intro-template',
    component: IntroTemplateComponent
  },

  { selector: 'website-tiny-intro-tip', component: IntroTipComponent },

  {
    selector: 'website-tiny-intro-tiscroll',
    component: IntroTiscrollComponent
  },

  { selector: 'website-tiny-ip-basic', component: IpBasicComponent },

  { selector: 'website-tiny-ip-disabled', component: IpDisabledComponent },

  {
    selector: 'website-tiny-ip-formcontrol',
    component: IpFormcontrolComponent
  },

  { selector: 'website-tiny-ip-valid', component: IpValidComponent },

  {
    selector: 'website-tiny-ipsection-basic',
    component: IpsectionBasicComponent
  },

  {
    selector: 'website-tiny-ipsection-disabled',
    component: IpsectionDisabledComponent
  },

  {
    selector: 'website-tiny-ipsection-events',
    component: IpsectionEventsComponent
  },

  {
    selector: 'website-tiny-ipsection-focus',
    component: IpsectionFocusComponent
  },

  {
    selector: 'website-tiny-ipsection-test',
    component: IpsectionTestComponent
  },

  {
    selector: 'website-tiny-ipsection-valid-formgroup',
    component: IpsectionValidFormgroupComponent
  },

  {
    selector: 'website-tiny-ipsection-valid',
    component: IpsectionValidComponent
  },
  { selector: 'website-tiny-labeleditor-basic', component: LabeleditorBasicComponent },

  { selector: 'website-tiny-labeleditor-autotip', component: LabeleditorAutotipComponent },

  { selector: 'website-tiny-labeleditor-icontipcontext', component: LabeleditorIconTipContextComponent },

  { selector: 'website-tiny-labeleditor-resize', component: LabeleditorResizeComponent },

  { selector: 'website-tiny-labeleditor-maxline', component: LabeleditorMaxlineComponent },

  { selector: 'website-tiny-labeleditor-maxlength', component: LabeleditorMaxlengthComponent },

  { selector: 'website-tiny-labeleditor-validation', component: LabeleditorValidationComponent },

  { selector: 'website-tiny-labeleditor-validation-async', component: LabeleditorValidationAsyncComponent },

  { selector: 'website-tiny-labeleditor-disabled', component: LabeleditorDisabledComponent },

  { selector: 'website-tiny-labeleditor-events', component: LabeleditorEventsComponent },

  { selector: 'website-tiny-labeleditor-multiline-size', component: LabeleditorMultilineSizeComponent },

  {
    selector: 'website-tiny-layout-basic-simple-responsive',
    component: LayoutBasicSimpleResponsiveComponent
  },

  {
    selector: 'website-tiny-layout-basic-simple',
    component: LayoutBasicSimpleComponent
  },

  { selector: 'website-tiny-layout-basic', component: LayoutBasicComponent },

  {
    selector: 'website-tiny-layout-detail-column',
    component: LayoutDetailColumnComponent
  },

  { selector: 'website-tiny-layout-detail', component: LayoutDetailComponent },

  {
    selector: 'website-tiny-layout-list-largedata',
    component: LayoutListLargedataComponent
  },

  { selector: 'website-tiny-layout-list', component: LayoutListComponent },

  {
    selector: 'website-tiny-layout-multi-column',
    component: LayoutMultiColumnComponent
  },

  {
    selector: 'website-tiny-layout-overview-vertical',
    component: LayoutOverviewVerticalComponent
  },

  {
    selector: 'website-tiny-layout-overview',
    component: LayoutOverviewComponent
  },

  {
    selector: 'website-tiny-layout-purchase-responsive-change',
    component: LayoutPurchaseResponsiveChangeComponent
  },

  {
    selector: 'website-tiny-layout-purchase-responsive',
    component: LayoutPurchaseResponsiveComponent
  },

  {
    selector: 'website-tiny-layout-purchase-simple-responsive',
    component: LayoutPurchaseSimpleResponsiveComponent
  },

  {
    selector: 'website-tiny-layout-purchase-simple',
    component: LayoutPurchaseSimpleComponent
  },

  {
    selector: 'website-tiny-layout-purchase',
    component: LayoutPurchaseComponent
  },

  { selector: 'website-tiny-layout-single', component: LayoutSingleComponent },

  {
    selector: 'website-tiny-leftmenu-active-change',
    component: LeftmenuActiveChangeWebsiteViewComponent
  },

  {
    selector: 'website-tiny-leftmenu-basic',
    component: LeftmenuBasicWebsiteViewComponent
  },

  {
    selector: 'website-tiny-leftmenu-collapsed',
    component: LeftmenuCollapsedWebsiteViewComponent
  },

  {
    selector: 'website-tiny-leftmenu-disabled',
    component: LeftmenuDisabledWebsiteViewComponent
  },

  {
    selector: 'website-tiny-leftmenu-dividing',
    component: LeftmenuDividingWebsiteViewComponent
  },

  {
    selector: 'website-tiny-leftmenu-foot',
    component: LeftmenuFootWebsiteViewComponent
  },

  {
    selector: 'website-tiny-leftmenu-group',
    component: LeftmenuGroupWebsiteViewComponent
  },

  {
    selector: 'website-tiny-leftmenu-href',
    component: LeftmenuHrefWebsiteViewComponent
  },

  {
    selector: 'website-tiny-leftmenu-no-router',
    component: LeftmenuNoRouterWebsiteViewComponent
  },

  {
    selector: 'website-tiny-leftmenu-params',
    component: LeftmenuParamsWebsiteViewComponent
  },

  {
    selector: 'website-tiny-leftmenu-reload-state',
    component: LeftmenuReloadStateWebsiteViewComponent
  },

  {
    selector: 'website-tiny-leftmenu-routerlist',
    component: LeftmenuRouterlistWebsiteViewComponent
  },

  {
    selector: 'website-tiny-leftmenu-toggleable',
    component: LeftmenuToggleableWebsiteViewComponent
  },

  { selector: 'website-tiny-leftmenuthin-basic', component: LeftmenuthinBasicWebsiteViewsComponent },

  { selector: 'website-tiny-leftmenuthin-params', component: LeftmenuthinParamsWebsiteViewsComponent },

  { selector: 'website-tiny-leftmenuthin-routerlist', component: LeftmenuthinRouterlistWebsiteViewsComponent },
  { selector: 'website-tiny-loading-area', component: LoadingAreaComponent },

  { selector: 'website-tiny-loading-basic', component: LoadingBasicComponent },

  { selector: 'website-tiny-loading-size', component: LoadingSizeComponent },

  { selector: 'website-tiny-loading-type', component: LoadingTypeComponent },

  { selector: 'website-tiny-locale-basic', component: LocaleBasicComponent },

  { selector: 'website-tiny-locale-language', component: LocaleLanguageComponent },

  { selector: 'website-tiny-locale-format', component: LocaleFormatComponent },

  { selector: 'website-tiny-locale-reload', component: LocaleReloadComponent },

  { selector: 'website-tiny-linkbutton-basic', component: LinkbuttonBasicComponent },

  { selector: 'website-tiny-menu-basic', component: MenuBasicComponent },

  {
    selector: 'website-tiny-menu-beforeopen',
    component: MenuBeforeopenComponent
  },

  { selector: 'website-tiny-menu-border', component: MenuBorderComponent },

  {
    selector: 'website-tiny-menu-buttoncolor',
    component: MenuButtoncolorComponent
  },

  { selector: 'website-tiny-menu-default', component: MenuDefaultComponent },

  { selector: 'website-tiny-menu-disabled', component: MenuDisabledComponent },

  { selector: 'website-tiny-menu-event', component: MenuEventComponent },

  { selector: 'website-tiny-menu-group', component: MenuGroupComponent },

  { selector: 'website-tiny-menu-id', component: MenuIdComponent },

  { selector: 'website-tiny-menu-labelkey', component: MenuLabelkeyComponent },

  {
    selector: 'website-tiny-menu-panelalign',
    component: MenuPanelalignComponent
  },

  {
    selector: 'website-tiny-menu-panelstyle',
    component: MenuPanelstyleComponent
  },

  {
    selector: 'website-tiny-menu-templete-test',
    component: MenuTempleteTestComponent
  },

  { selector: 'website-tiny-menu-templete', component: MenuTempleteComponent },

  { selector: 'website-tiny-menu-tips', component: MenuTipsComponent },

  { selector: 'website-tiny-message-basic', component: MessageBasicComponent },

  {
    selector: 'website-tiny-message-btn-test',
    component: MessageBtnTestComponent
  },

  { selector: 'website-tiny-message-btn', component: MessageBtnComponent },

  {
    selector: 'website-tiny-message-content',
    component: MessageContentComponent
  },

  { selector: 'website-tiny-message-id', component: MessageIdComponent },

  {
    selector: 'website-tiny-message-security',
    component: MessageSecurityComponent
  },

  { selector: 'website-tiny-message-title', component: MessageTitleComponent },

  { selector: 'website-tiny-message-type', component: MessageTypeComponent },

  {
    selector: 'website-tiny-modal-animation',
    component: ModalAnimationComponent
  },

  {
    selector: 'website-tiny-modal-backdrop',
    component: ModalBackdropComponent
  },

  { selector: 'website-tiny-modal-class', component: ModalClassComponent },

  {
    selector: 'website-tiny-modal-close-icon',
    component: ModalCloseIconComponent
  },

  {
    selector: 'website-tiny-modal-config-test',
    component: ModalConfigTestComponent
  },

  {
    selector: 'website-tiny-modal-content-comp',
    component: ModalContentCompComponent
  },

  {
    selector: 'website-tiny-modal-content-temp',
    component: ModalContentTempComponent
  },

  {
    selector: 'website-tiny-modal-draggable',
    component: ModalDraggableComponent
  },

  { selector: 'website-tiny-modal-esc', component: ModalEscComponent },

  { selector: 'website-tiny-modal-event', component: ModalEventComponent },

  {
    selector: 'website-tiny-modal-header-align',
    component: ModalHeaderAlignComponent
  },

  {
    selector: 'website-tiny-modal-header-style',
    component: ModalHeaderStyleComponent
  },

  {
    selector: 'website-tiny-modal-two-backdrop',
    component: ModalTwoBackdropComponent
  },

  { selector: 'website-tiny-modal-two-test', component: ModalTwoTestComponent },

  { selector: 'website-tiny-nav-active', component: NavActiveComponent },

  { selector: 'website-tiny-nav-align', component: NavAlignComponent },

  { selector: 'website-tiny-nav-basic', component: NavBasicComponent },

  { selector: 'website-tiny-nav-disabled', component: NavDisabledComponent },

  { selector: 'website-tiny-nav-event', component: NavEventComponent },

  { selector: 'website-tiny-nav-left', component: NavLeftComponent },

  { selector: 'website-tiny-nav-right', component: NavRightComponent },

  {
    selector: 'website-tiny-nav-selectable',
    component: NavSelectableComponent
  },

  { selector: 'website-tiny-nav-submenu', component: NavSubmenuComponent },

  { selector: 'website-tiny-nav-template', component: NavTemplateComponent },

  { selector: 'website-tiny-nav-theme', component: NavThemeComponent },

  { selector: 'website-tiny-nav-width', component: NavWidthComponent },

  {
    selector: 'website-tiny-notification-animation',
    component: NotificationAnimationComponent
  },

  {
    selector: 'website-tiny-notification-basic',
    component: NotificationBasicComponent
  },

  {
    selector: 'website-tiny-notification-close',
    component: NotificationCloseComponent
  },

  {
    selector: 'website-tiny-notification-config',
    component: NotificationConfigComponent
  },

  {
    selector: 'website-tiny-notification-duration',
    component: NotificationDurationComponent
  },

  {
    selector: 'website-tiny-notification-events',
    component: NotificationEventsComponent
  },

  {
    selector: 'website-tiny-notification-hover-pause',
    component: NotificationHoverPauseComponent
  },

  {
    selector: 'website-tiny-notification-name',
    component: NotificationNameComponent
  },

  {
    selector: 'website-tiny-notification-position',
    component: NotificationPositionComponent
  },

  {
    selector: 'website-tiny-notification-template',
    component: NotificationTemplateComponent
  },

  {
    selector: 'website-tiny-notification-type',
    component: NotificationTypeComponent
  },

  {
    selector: 'website-tiny-overflow-destory',
    component: OverflowDestoryComponent
  },

  {
    selector: 'website-tiny-overflow-directive',
    component: OverflowDirectiveComponent
  },

  {
    selector: 'website-tiny-overflow-maxline',
    component: OverflowMaxlineComponent
  },

  {
    selector: 'website-tiny-overflow-maxwidth',
    component: OverflowMaxwidthComponent
  },

  {
    selector: 'website-tiny-overflow-position',
    component: OverflowPositionComponent
  },

  {
    selector: 'website-tiny-overflow-service',
    component: OverflowServiceComponent
  },

  { selector: 'website-tiny-overflow-test', component: OverflowTestComponent },

  {
    selector: 'website-tiny-overflow-tipcontent',
    component: OverflowTipcontentComponent
  },

  { selector: 'website-tiny-phonenumber-basic', component: PhonenumberBasicComponent },

  { selector: 'website-tiny-phonenumber-disabled', component: PhonenumberDisabledComponent },

  { selector: 'website-tiny-phonenumber-event', component: PhonenumberEventComponent },

  { selector: 'website-tiny-phonenumber-valid', component: PhonenumberValidComponent },

  { selector: 'website-tiny-phonenumber-country', component: PhonenumberCountryComponent },

  {
    selector: 'website-tiny-pagination-autohide',
    component: PaginationAutohideComponent
  },

  {
    selector: 'website-tiny-pagination-disabled',
    component: PaginationDisabledComponent
  },

  {
    selector: 'website-tiny-pagination-event',
    component: PaginationEventComponent
  },

  {
    selector: 'website-tiny-pagination-fixed',
    component: PaginationFixedComponent
  },

  {
    selector: 'website-tiny-pagination-loading',
    component: PaginationLoadingComponent
  },

  {
    selector: 'website-tiny-pagination-pageselectwidth',
    component: PaginationPageselectwidthComponent
  },

  {
    selector: 'website-tiny-pagination-pagesize',
    component: PaginationPagesizeComponent
  },

  {
    selector: 'website-tiny-pagination-showgotolink',
    component: PaginationShowgotolinkComponent
  },

  {
    selector: 'website-tiny-pagination-showlastpage',
    component: PaginationShowlastpageComponent
  },

  {
    selector: 'website-tiny-pagination-showtotalnumber',
    component: PaginationShowtotalnumberComponent
  },

  {
    selector: 'website-tiny-pagination-type',
    component: PaginationTypeComponent
  },
  { selector: 'website-tiny-pathfield-items', component: PathfieldItemsComponent },

  { selector: 'website-tiny-pathfield-ispanel', component: PathfieldIspanelComponent },

  { selector: 'website-tiny-pathfield-panelwidth', component: PathfieldPanelwidthComponent },

  { selector: 'website-tiny-pathfield-editable', component: PathfieldEditableComponent },

  { selector: 'website-tiny-pathfield-event', component: PathfieldEventComponent },

  { selector: 'website-tiny-path-list', component: PathListComponent },

  { selector: 'website-tiny-path-select', component: PathSelectComponent },

  {
    selector: 'website-tiny-popconfirm-basic',
    component: PopconfirmBasicComponent
  },

  {
    selector: 'website-tiny-popconfirm-define',
    component: PopconfirmDefineComponent
  },

  {
    selector: 'website-tiny-popconfirm-event',
    component: PopconfirmEventComponent
  },

  {
    selector: 'website-tiny-popconfirm-table-define',
    component: PopconfirmTableDefineComponent
  },

  {
    selector: 'website-tiny-popconfirm-table',
    component: PopconfirmTableComponent
  },

  {
    selector: 'website-tiny-progressbar-animation',
    component: ProgressbarAnimationComponent
  },

  {
    selector: 'website-tiny-progressbar-basic',
    component: ProgressbarBasicComponent
  },

  {
    selector: 'website-tiny-progressbar-class',
    component: ProgressbarClassComponent
  },

  {
    selector: 'website-tiny-productpreview-basic',
    component: ProductpreviewBasicComponent
  },

  { selector: 'website-tiny-radio-basic', component: RadioBasicComponent },

  { selector: 'website-tiny-radio-dark', component: RadioDarkComponent },

  {
    selector: 'website-tiny-radio-disabled',
    component: RadioDisabledComponent
  },

  { selector: 'website-tiny-radio-event', component: RadioEventComponent },

  { selector: 'website-tiny-radio-focus', component: RadioFocusComponent },

  { selector: 'website-tiny-radio-group', component: RadioGroupComponent },

  {
    selector: 'website-tiny-radio-group-direction',
    component: RadioGroupDirectionComponent
  },

  {
    selector: 'website-tiny-radio-group-labelkey',
    component: RadioGroupLabelkeyComponent
  },

  {
    selector: 'website-tiny-radio-group-linewrap',
    component: RadioGroupLinewrapComponent
  },

  {
    selector: 'website-tiny-radio-group-validation',
    component: RadioGroupValidationComponent
  },

  {
    selector: 'website-tiny-radio-group-valuekey',
    component: RadioGroupValuekeyComponent
  },

  { selector: 'website-tiny-radio-label', component: RadioLabelComponent },

  { selector: 'website-tiny-rate-basic', component: RateBasicComponent },

  { selector: 'website-tiny-rate-disabled', component: RateDisabledComponent },

  { selector: 'website-tiny-rate-event', component: RateEventComponent },

  { selector: 'website-tiny-rate-id', component: RateIdComponent },

  { selector: 'website-tiny-rate-load', component: RateLoadComponent },

  { selector: 'website-tiny-rights-basic', component: RightsBasicComponent },

  { selector: 'website-tiny-rights-type', component: RightsTypeComponent },

  {
    selector: 'website-tiny-score-basic',
    component: ScoreBasicComponent
  },

  {
    selector: 'website-tiny-score-events',
    component: ScoreEventsComponent
  },

  {
    selector: 'website-tiny-score-limittext',
    component: ScoreLimittextComponent
  },

  {
    selector: 'website-tiny-score-padding',
    component: ScorePaddingComponent
  },

  {
    selector: 'website-tiny-searchbox-appendtobody',
    component: SearchboxAppendtobodyComponent
  },

  {
    selector: 'website-tiny-searchbox-basic',
    component: SearchboxBasicComponent
  },

  {
    selector: 'website-tiny-searchbox-disabled',
    component: SearchboxDisabledComponent
  },

  {
    selector: 'website-tiny-searchbox-event',
    component: SearchboxEventComponent
  },

  {
    selector: 'website-tiny-searchbox-maxlength',
    component: SearchboxMaxlengthComponent
  },

  {
    selector: 'website-tiny-searchbox-notsearch',
    component: SearchboxNotsearchComponent
  },

  {
    selector: 'website-tiny-searchbox-options',
    component: SearchboxOptionsComponent
  },

  {
    selector: 'website-tiny-searchbox-panelsize',
    component: SearchboxPanelsizeComponent
  },

  {
    selector: 'website-tiny-searchbox-reactive',
    component: SearchboxReactiveComponent
  },

  {
    selector: 'website-tiny-searchbox-suggest',
    component: SearchboxSuggestComponent
  },

  {
    selector: 'website-tiny-searchbox-template',
    component: SearchboxTemplateComponent
  },

  {
    selector: 'website-tiny-searchbox-test',
    component: SearchboxTestComponent
  },

  {
    selector: 'website-tiny-searchbox-trimmed',
    component: SearchboxTrimmedComponent
  },

  {
    selector: 'website-tiny-searchbox-valid',
    component: SearchboxValidComponent
  },

  {
    selector: 'website-tiny-searchbox-virtualscroll',
    component: SearchboxVirtualscrollComponent
  },

  { selector: 'website-tiny-selectgroup-basic', component: SelectgroupBasicComponent },

  { selector: 'website-tiny-selectgroup-multiple', component: SelectgroupMultipleComponent },

  { selector: 'website-tiny-selectgroup-valuekey', component: SelectgroupValuekeyComponent },

  { selector: 'website-tiny-selectgroup-template', component: SelectgroupTemplateComponent },

  { selector: 'website-tiny-selectgroup-select', component: SelectgroupSelectComponent },

  {
    selector: 'website-tiny-select-appendtobody',
    component: SelectAppendtobodyComponent
  },

  { selector: 'website-tiny-select-basic', component: SelectBasicComponent },

  {
    selector: 'website-tiny-select-beforesearch-test',
    component: SelectBeforesearchTestComponent
  },

  {
    selector: 'website-tiny-select-beforesearch',
    component: SelectBeforesearchComponent
  },

  {
    selector: 'website-tiny-select-change-selectall',
    component: SelectChangeSelectallComponent
  },

  {
    selector: 'website-tiny-select-clearable',
    component: SelectClearableComponent
  },

  {
    selector: 'website-tiny-select-disabled',
    component: SelectDisabledComponent
  },

  {
    selector: 'website-tiny-select-disabledfocus',
    component: SelectDisabledfocusComponent
  },

  { selector: 'website-tiny-select-enum', component: SelectEnumComponent },

  { selector: 'website-tiny-select-event', component: SelectEventComponent },

  { selector: 'website-tiny-select-focus', component: SelectFocusComponent },

  { selector: 'website-tiny-select-group', component: SelectGroupComponent },

  { selector: 'website-tiny-select-id', component: SelectIdComponent },

  { selector: 'website-tiny-select-idkey', component: SelectIdkeyComponent },

  { selector: 'website-tiny-select-input', component: SelectInputComponent },

  {
    selector: 'website-tiny-select-labelkey',
    component: SelectLabelkeyComponent
  },

  { selector: 'website-tiny-select-lazy', component: SelectLazyComponent },

  { selector: 'website-tiny-select-leak', component: SelectLeakComponent },

  { selector: 'website-tiny-select-load', component: SelectLoadComponent },

  { selector: 'website-tiny-select-many', component: SelectManyComponent },

  {
    selector: 'website-tiny-select-maxline',
    component: SelectMaxlineComponent
  },

  { selector: 'website-tiny-select-much', component: SelectMuchComponent },

  { selector: 'website-tiny-select-multi', component: SelectMultiComponent },

  {
    selector: 'website-tiny-select-noborder',
    component: SelectNoborderComponent
  },

  { selector: 'website-tiny-select-nodata', component: SelectNodataComponent },

  {
    selector: 'website-tiny-select-noempty',
    component: SelectNoemptyComponent
  },

  { selector: 'website-tiny-select-null', component: SelectNullComponent },

  {
    selector: 'website-tiny-select-pagin-beforesearch',
    component: SelectPaginBeforesearchComponent
  },

  {
    selector: 'website-tiny-select-pagination',
    component: SelectPaginationComponent
  },

  { selector: 'website-tiny-select-panel', component: SelectPanelComponent },

  {
    selector: 'website-tiny-select-reservesearchword',
    component: SelectReservesearchwordComponent
  },

  {
    selector: 'website-tiny-select-scroll-load',
    component: SelectScrollLoadComponent
  },

  { selector: 'website-tiny-select-search', component: SelectSearchComponent },

  {
    selector: 'website-tiny-select-searchkeys',
    component: SelectSearchkeysComponent
  },

  {
    selector: 'website-tiny-select-selectall',
    component: SelectSelectallComponent
  },

  {
    selector: 'website-tiny-select-showselectednumber',
    component: SelectShowselectednumberComponent
  },

  { selector: 'website-tiny-select-small', component: SelectSmallComponent },

  { selector: 'website-tiny-select-tag', component: SelectTagComponent },

  {
    selector: 'website-tiny-select-template',
    component: SelectTemplateComponent
  },

  { selector: 'website-tiny-select-tip', component: SelectTipComponent },

  {
    selector: 'website-tiny-select-tiscroll',
    component: SelectTiscrollComponent
  },

  { selector: 'website-tiny-select-tworow', component: SelectTworowComponent },

  { selector: 'website-tiny-select-valid', component: SelectValidComponent },

  {
    selector: 'website-tiny-select-validgroup',
    component: SelectValidgroupComponent
  },

  {
    selector: 'website-tiny-select-valuekey-test',
    component: SelectValuekeyTestComponent
  },

  {
    selector: 'website-tiny-select-valuekey',
    component: SelectValuekeyComponent
  },

  {
    selector: 'website-tiny-select-virtualscroll-multi',
    component: SelectVirtualscrollMultiComponent
  },

  {
    selector: 'website-tiny-select-virtualscroll',
    component: SelectVirtualscrollComponent
  },

  { selector: 'website-tiny-skeleton-page', component: SkeletonPageComponent },

  {
    selector: 'website-tiny-skeleton-title',
    component: SkeletonTitleComponent
  },

  { selector: 'website-tiny-skeleton-type', component: SkeletonTypeComponent },

  { selector: 'website-tiny-slider-event', component: SliderEventComponent },

  {
    selector: 'website-tiny-slider-formcontrol',
    component: SliderFormcontrolComponent
  },

  { selector: 'website-tiny-slider-hidden', component: SliderHiddenComponent },

  { selector: 'website-tiny-slider-limits', component: SliderLimitsComponent },

  { selector: 'website-tiny-slider-ratios', component: SliderRatiosComponent },

  { selector: 'website-tiny-slider-scales', component: SliderScalesComponent },

  {
    selector: 'website-tiny-slider-template',
    component: SliderTemplateComponent
  },

  { selector: 'website-tiny-slider-tip', component: SliderTipComponent },

  {
    selector: 'website-tiny-spinner-basic-test',
    component: SpinnerBasicTestComponent
  },

  { selector: 'website-tiny-spinner-basic', component: SpinnerBasicComponent },

  {
    selector: 'website-tiny-spinner-correctable',
    component: SpinnerCorrectableComponent
  },

  {
    selector: 'website-tiny-spinner-disabled',
    component: SpinnerDisabledComponent
  },

  { selector: 'website-tiny-spinner-event', component: SpinnerEventComponent },

  {
    selector: 'website-tiny-spinner-format',
    component: SpinnerFormatComponent
  },

  { selector: 'website-tiny-spinner-load', component: SpinnerLoadComponent },

  {
    selector: 'website-tiny-spinner-localeable',
    component: SpinnerLocaleableComponent
  },

  {
    selector: 'website-tiny-spinner-max-min',
    component: SpinnerMaxMinComponent
  },

  {
    selector: 'website-tiny-spinner-maxlength',
    component: SpinnerMaxlengthComponent
  },

  { selector: 'website-tiny-spinner-step', component: SpinnerStepComponent },

  {
    selector: 'website-tiny-spinner-stepfn',
    component: SpinnerStepfnComponent
  },

  {
    selector: 'website-tiny-spinner-tip-test',
    component: SpinnerTipTestComponent
  },

  { selector: 'website-tiny-spinner-tip', component: SpinnerTipComponent },

  {
    selector: 'website-tiny-spinner-validation-test',
    component: SpinnerValidationTestComponent
  },

  {
    selector: 'website-tiny-spinner-validation',
    component: SpinnerValidationComponent
  },

  { selector: 'website-tiny-steps-active', component: StepsActiveComponent },

  {
    selector: 'website-tiny-steps-adaptive-test',
    component: StepsAdaptiveTestComponent
  },

  {
    selector: 'website-tiny-steps-adaptive',
    component: StepsAdaptiveComponent
  },

  { selector: 'website-tiny-steps-base', component: StepsBaseComponent },

  { selector: 'website-tiny-steps-before', component: StepsBeforeComponent },

  {
    selector: 'website-tiny-steps-clickable',
    component: StepsClickableComponent
  },

  { selector: 'website-tiny-steps-events', component: StepsEventsComponent },

  { selector: 'website-tiny-steps-label', component: StepsLabelComponent },

  {
    selector: 'website-tiny-steps-maxwidth',
    component: StepsMaxwidthComponent
  },

  {
    selector: 'website-tiny-steps-template',
    component: StepsTemplateComponent
  },

  {
    selector: 'website-tiny-subtitle-basic',
    component: SubtitleBasicComponent
  },

  {
    selector: 'website-tiny-subtitle-before-search',
    component: SubtitleBeforeSearchComponent
  },

  { selector: 'website-tiny-subtitle-dark', component: SubtitleDarkComponent },

  {
    selector: 'website-tiny-subtitle-event',
    component: SubtitleEventComponent
  },

  {
    selector: 'website-tiny-subtitle-idkey',
    component: SubtitleIdkeyComponent
  },

  {
    selector: 'website-tiny-subtitle-items',
    component: SubtitleItemsComponent
  },

  {
    selector: 'website-tiny-subtitle-maxwidth',
    component: SubtitleMaxwidthComponent
  },

  {
    selector: 'website-tiny-subtitle-panelwidth',
    component: SubtitlePanelwidthComponent
  },

  {
    selector: 'website-tiny-subtitle-route',
    component: SubtitleRouteComponent
  },

  {
    selector: 'website-tiny-subtitle-scroll-load',
    component: SubtitleScrollLoadComponent
  },

  {
    selector: 'website-tiny-subtitle-searchable',
    component: SubtitleSearchableComponent
  },

  {
    selector: 'website-tiny-subtitle-target',
    component: SubtitleTargetComponent
  },

  {
    selector: 'website-tiny-subtitle-tip-position',
    component: SubtitleTipPositionComponent
  },

  {
    selector: 'website-tiny-swiper-activeindex',
    component: SwiperActiveindexComponent
  },

  {
    selector: 'website-tiny-swiper-autoplay',
    component: SwiperAutoplayComponent
  },

  { selector: 'website-tiny-swiper-basic', component: SwiperBasicComponent },

  { selector: 'website-tiny-swiper-events', component: SwiperEventsComponent },

  {
    selector: 'website-tiny-swiper-indicatorposition',
    component: SwiperIndicatorpositionComponent
  },

  { selector: 'website-tiny-swiper-loop', component: SwiperLoopComponent },

  {
    selector: 'website-tiny-swiper-showcardnum-test',
    component: SwiperShowcardnumTestComponent
  },

  {
    selector: 'website-tiny-swiper-showcardnum',
    component: SwiperShowcardnumComponent
  },

  { selector: 'website-tiny-switch-basic', component: SwitchBasicComponent },

  { selector: 'website-tiny-switch-before', component: SwitchBeforeComponent },

  {
    selector: 'website-tiny-switch-disabled',
    component: SwitchDisabledComponent
  },

  { selector: 'website-tiny-switch-event', component: SwitchEventComponent },

  {
    selector: 'website-tiny-switch-explanation',
    component: SwitchExplanationComponent
  },

  { selector: 'website-tiny-switch-focus', component: SwitchFocusComponent },

  { selector: 'website-tiny-switch-id', component: SwitchIdComponent },

  { selector: 'website-tiny-switch-load', component: SwitchLoadComponent },

  {
    selector: 'website-tiny-switch-template',
    component: SwitchTemplateComponent
  },

  { selector: 'website-tiny-tab-basic', component: TabBasicComponent },

  {
    selector: 'website-tiny-tab-beforeactivechange',
    component: TabBeforeactivechangeComponent
  },

  {
    selector: 'website-tiny-tab-content-comp',
    component: TabContentCompComponent
  },

  {
    selector: 'website-tiny-tab-custom-head',
    component: TabCustomHeadComponent
  },

  { selector: 'website-tiny-tab-dark', component: TabDarkComponent },

  {
    selector: 'website-tiny-tab-default-test',
    component: TabDefaultTestComponent
  },

  { selector: 'website-tiny-tab-lazy-load', component: TabLazyLoadComponent },

  {
    selector: 'website-tiny-tab-level2-test',
    component: TabLevel2TestComponent
  },

  { selector: 'website-tiny-tab-level2', component: TabLevel2Component },

  { selector: 'website-tiny-tab-overflow', component: TabOverflowComponent },

  { selector: 'website-tiny-tab-route', component: TabRouteWebsiteViewComponent },

  { selector: 'website-tiny-tab-scroll', component: TabScrollComponent },

  { selector: 'website-tiny-tab-small', component: TabSmallComponent },

  {
    selector: 'website-tiny-table-actionmenu',
    component: TableActionmenuComponent
  },

  {
    selector: 'website-tiny-table-basic-test',
    component: TableBasicTestComponent
  },

  { selector: 'website-tiny-table-basic', component: TableBasicComponent },

  { selector: 'website-tiny-table-cell-tip', component: TableCellTipComponent },

  {
    selector: 'website-tiny-table-cellicons-colsresizable',
    component: TableCelliconsColsresizableComponent
  },

  {
    selector: 'website-tiny-table-checkbox-pagination-headmenu',
    component: TableCheckboxPaginationHeadmenuComponent
  },

  {
    selector: 'website-tiny-table-checkbox-pagination',
    component: TableCheckboxPaginationComponent
  },

  {
    selector: 'website-tiny-table-checkbox',
    component: TableCheckboxComponent
  },

  {
    selector: 'website-tiny-table-col-align',
    component: TableColAlignComponent
  },

  {
    selector: 'website-tiny-table-colalign-sort-resizable-test',
    component: TableColalignSortResizableTestComponent
  },

  {
    selector: 'website-tiny-table-cols-resizable',
    component: TableColsResizableComponent
  },

  {
    selector: 'website-tiny-table-cols-toggle-details',
    component: TableColsToggleDetailsComponent
  },

  {
    selector: 'website-tiny-table-cols-toggle-test',
    component: TableColsToggleTestComponent
  },

  {
    selector: 'website-tiny-table-cols-toggle',
    component: TableColsToggleComponent
  },

  {
    selector: 'website-tiny-table-colsresizable-basic',
    component: TableColsresizableBasicComponent
  },

  {
    selector: 'website-tiny-table-colsresizable-colstoggle-fixedhead',
    component: TableColsresizableColstoggleFixedheadComponent
  },

  {
    selector: 'website-tiny-table-colsresizable-colstoggle',
    component: TableColsresizableColstoggleComponent
  },

  {
    selector: 'website-tiny-table-colsresizable-loadfail',
    component: TableColsresizableLoadfailComponent
  },

  {
    selector: 'website-tiny-table-colsresizable-sort-headfilter',
    component: TableColsresizableSortHeadfilterComponent
  },

  {
    selector: 'website-tiny-table-colsresizable-sort',
    component: TableColsresizableSortComponent
  },

  {
    selector: 'website-tiny-table-column-fixed',
    component: TableColumnFixedComponent
  },

  {
    selector: 'website-tiny-table-columnfixed-checkbox',
    component: TableColumnfixedCheckboxComponent
  },

  {
    selector: 'website-tiny-table-columnfixed-colstoggle',
    component: TableColumnfixedColstoggleComponent
  },

  {
    selector: 'website-tiny-table-columnfixed-editrow',
    component: TableColumnfixedEditrowComponent
  },

  {
    selector: 'website-tiny-table-columnfixed-fixedhead-colsresizable-pagination',
    component: TableColumnfixedFixedheadColsresizablePaginationComponent
  },

  {
    selector: 'website-tiny-table-columnfixed-headfixed',
    component: TableColumnfixedHeadfixedComponent
  },

  {
    selector: 'website-tiny-table-columnfixed-leftmenu',
    component: TableColumnfixedLeftmenuComponent
  },

  {
    selector: 'website-tiny-table-columnfixed-nodata',
    component: TableColumnfixedNodataComponent
  },

  {
    selector: 'website-tiny-table-columnfixed-pagination',
    component: TableColumnfixedPaginationComponent
  },

  {
    selector: 'website-tiny-table-columnfixed-resizable',
    component: TableColumnfixedResizableComponent
  },

  {
    selector: 'website-tiny-table-comprehensive',
    component: TableComprehensiveComponent
  },

  {
    selector: 'website-tiny-table-details-closeotherdetails',
    component: TableDetailsCloseotherdetailsComponent
  },

  {
    selector: 'website-tiny-table-details-nesttable',
    component: TableDetailsNesttableComponent
  },

  {
    selector: 'website-tiny-table-details-pagination',
    component: TableDetailsPaginationComponent
  },

  { selector: 'website-tiny-table-details', component: TableDetailsComponent },

  {
    selector: 'website-tiny-table-dynamic-details',
    component: TableDynamicDetailsComponent
  },

  {
    selector: 'website-tiny-table-editall-test',
    component: TableEditallTestComponent
  },

  { selector: 'website-tiny-table-editall', component: TableEditallComponent },

  {
    selector: 'website-tiny-table-editrow-test',
    component: TableEditrowTestComponent
  },

  { selector: 'website-tiny-table-editrow', component: TableEditrowComponent },

  {
    selector: 'website-tiny-table-filter-strict',
    component: TableFilterStrictComponent
  },

  { selector: 'website-tiny-table-filter', component: TableFilterComponent },

  {
    selector: 'website-tiny-table-fixed-head-cols-resizable',
    component: TableFixedHeadColsResizableComponent
  },

  {
    selector: 'website-tiny-table-fixed-head-in-accordion',
    component: TableFixedHeadInAccordionComponent
  },

  {
    selector: 'website-tiny-table-fixed-head-nodata',
    component: TableFixedHeadNodataComponent
  },

  {
    selector: 'website-tiny-table-fixed-head-pagination-details',
    component: TableFixedHeadPaginationDetailsComponent
  },

  {
    selector: 'website-tiny-table-fixed-head',
    component: TableFixedHeadComponent
  },

  {
    selector: 'website-tiny-table-fixedhead-colsresizable-pagination-details',
    component: TableFixedheadColsresizablePaginationDetailsComponent
  },

  {
    selector: 'website-tiny-table-fixhead-scroll',
    component: TableFixheadScrollComponent
  },

  { selector: 'website-tiny-table-group', component: TableGroupComponent },

  { selector: 'website-tiny-table-guide', component: TableGuideComponent },

  {
    selector: 'website-tiny-table-head-filter-datetime-test',
    component: TableHeadFilterDatetimeTestComponent
  },

  {
    selector: 'website-tiny-table-head-filter-datetime',
    component: TableHeadFilterDatetimeComponent
  },

  {
    selector: 'website-tiny-table-head-filter-multi-valuekey',
    component: TableHeadFilterMultiValuekeyComponent
  },

  {
    selector: 'website-tiny-table-head-filter-multi',
    component: TableHeadFilterMultiComponent
  },

  {
    selector: 'website-tiny-table-head-filter-test',
    component: TableHeadFilterTestComponent
  },

  {
    selector: 'website-tiny-table-head-filter-valuekey',
    component: TableHeadFilterValuekeyComponent
  },

  {
    selector: 'website-tiny-table-head-filter-virtualscroll',
    component: TableHeadFilterVirtualscrollComponent
  },

  {
    selector: 'website-tiny-table-head-filter',
    component: TableHeadFilterComponent
  },

  {
    selector: 'website-tiny-table-load-fail',
    component: TableLoadFailComponent
  },

  {
    selector: 'website-tiny-table-nodata-simple',
    component: TableNodataSimpleComponent
  },

  {
    selector: 'website-tiny-table-nodata-test',
    component: TableNodataTestComponent
  },

  { selector: 'website-tiny-table-nodata', component: TableNodataComponent },

  {
    selector: 'website-tiny-table-overflow-link',
    component: TableOverflowLinkComponent
  },

  {
    selector: 'website-tiny-table-pagi-with-filter',
    component: TablePagiWithFilterComponent
  },

  {
    selector: 'website-tiny-table-pagination',
    component: TablePaginationComponent
  },

  {
    selector: 'website-tiny-table-radio-test',
    component: TableRadioTestComponent
  },

  { selector: 'website-tiny-table-radio', component: TableRadioComponent },

  {
    selector: 'website-tiny-table-row-drag2',
    component: TableRowDrag2Component
  },

  { selector: 'website-tiny-table-rowspan', component: TableRowspanComponent },

  { selector: 'website-tiny-table-search', component: TableSearchComponent },

  {
    selector: 'website-tiny-table-server-pagi-search-sort',
    component: TableServerPagiSearchSortComponent
  },

  {
    selector: 'website-tiny-table-server-pagi',
    component: TableServerPagiComponent
  },

  { selector: 'website-tiny-table-small', component: TableSmallComponent },

  { selector: 'website-tiny-table-soldout', component: TableSoldoutComponent },

  {
    selector: 'website-tiny-table-sort-basic',
    component: TableSortBasicComponent
  },

  {
    selector: 'website-tiny-table-sort-comparefn-locale',
    component: TableSortComparefnLocaleComponent
  },

  {
    selector: 'website-tiny-table-sort-comparefn',
    component: TableSortComparefnComponent
  },

  {
    selector: 'website-tiny-table-sort-details',
    component: TableSortDetailsComponent
  },

  {
    selector: 'website-tiny-table-sort-reset',
    component: TableSortResetComponent
  },

  {
    selector: 'website-tiny-table-sort-test',
    component: TableSortTestComponent
  },

  { selector: 'website-tiny-table-sort', component: TableSortComponent },

  {
    selector: 'website-tiny-table-storage-config',
    component: TableStorageConfigComponent
  },

  {
    selector: 'website-tiny-table-storage-filter',
    component: TableStorageFilterComponent
  },

  {
    selector: 'website-tiny-table-storage-serve',
    component: TableStorageServeComponent
  },

  { selector: 'website-tiny-table-storage', component: TableStorageComponent },

  {
    selector: 'website-tiny-table-tree-mulitiselect',
    component: TableTreeMulitiselectComponent
  },

  {
    selector: 'website-tiny-table-tree-unknowdeepth',
    component: TableTreeUnknowdeepthComponent
  },

  { selector: 'website-tiny-table-tree', component: TableTreeComponent },

  {
    selector: 'website-tiny-table-virtualscroll-basic',
    component: TableVirtualscrollBasicComponent
  },

  {
    selector: 'website-tiny-table-virtualscroll-comprehensive',
    component: TableVirtualscrollComprehensiveComponent
  },

  {
    selector: 'website-tiny-table-virtualscroll-sizes',
    component: TableVirtualscrollSizesComponent
  },

  {
    selector: 'website-tiny-table-virtualscroll-tree',
    component: TableVirtualscrollTreeComponent
  },

  {
    selector: 'website-tiny-table-virtualscroll',
    component: TableVirtualscrollComponent
  },

  { selector: 'website-tiny-tag-basic', component: TagBasicComponent },

  { selector: 'website-tiny-tag-default', component: TagDefaultComponent },

  { selector: 'website-tiny-tag-disabled', component: TagDisabledComponent },

  { selector: 'website-tiny-tag-edit', component: TagEditComponent },

  { selector: 'website-tiny-tag-events', component: TagEventsComponent },

  {
    selector: 'website-tiny-tagsinput-basic',
    component: TagsinputBasicComponent
  },

  {
    selector: 'website-tiny-tagsinput-disabled',
    component: TagsinputDisabledComponent
  },

  {
    selector: 'website-tiny-tagsinput-events',
    component: TagsinputEventsComponent
  },

  {
    selector: 'website-tiny-tagsinput-labelkey',
    component: TagsinputLabelkeyComponent
  },

  {
    selector: 'website-tiny-tagsinput-null',
    component: TagsinputNullComponent
  },

  {
    selector: 'website-tiny-tagsinput-panelwidth',
    component: TagsinputPanelwidthComponent
  },

  {
    selector: 'website-tiny-tagsinput-separators',
    component: TagsinputSeparatorsComponent
  },

  {
    selector: 'website-tiny-tagsinput-reactive',
    component: TagsinputReactiveComponent
  },

  {
    selector: 'website-tiny-tagsinput-suggestion',
    component: TagsinputSuggestionComponent
  },

  {
    selector: 'website-tiny-tagsinput-template',
    component: TagsinputTemplateComponent
  },

  {
    selector: 'website-tiny-tagsinput-valid',
    component: TagsinputValidComponent
  },

  {
    selector: 'website-tiny-tagsinput-valuekey',
    component: TagsinputValuekeyComponent
  },

  {
    selector: 'website-tiny-tagsinput-maxlength',
    component: TagsinputMaxlengthComponent
  },

  { selector: 'website-tiny-text-basic', component: TextBasicComponent },

  { selector: 'website-tiny-text-clear', component: TextClearComponent },

  { selector: 'website-tiny-text-disabled', component: TextDisabledComponent },

  { selector: 'website-tiny-text-events', component: TextEventsComponent },

  { selector: 'website-tiny-text-focus', component: TextFocusComponent },

  {
    selector: 'website-tiny-text-maskinput',
    component: TextMaskinputComponent
  },

  {
    selector: 'website-tiny-text-noborder-test',
    component: TextNoborderTestComponent
  },

  {
    selector: 'website-tiny-text-password-visible',
    component: TextPasswordVisibleComponent
  },

  { selector: 'website-tiny-text-password', component: TextPasswordComponent },

  { selector: 'website-tiny-text-reactive', component: TextReactiveComponent },

  { selector: 'website-tiny-text-readonly', component: TextReadonlyComponent },

  {
    selector: 'website-tiny-textarea-autofocus',
    component: TextareaAutofocusComponent
  },

  {
    selector: 'website-tiny-textarea-disabled',
    component: TextareaDisabledComponent
  },

  {
    selector: 'website-tiny-textarea-maxlength',
    component: TextareaMaxlengthComponent
  },

  { selector: 'website-tiny-textarea-none', component: TextareaNoneComponent },

  {
    selector: 'website-tiny-textarea-resize',
    component: TextareaResizeComponent
  },

  {
    selector: 'website-tiny-textarea-scroll',
    component: TextareaScrollComponent
  },

  {
    selector: 'website-tiny-textarea-valid',
    component: TextareaValidComponent
  },

  {
    selector: 'website-tiny-textarea-width',
    component: TextareaWidthComponent
  },

  {
    selector: 'website-tiny-time-clearicon',
    component: TimeCleariconComponent
  },

  { selector: 'website-tiny-time-disabled', component: TimeDisabledComponent },

  { selector: 'website-tiny-time-event', component: TimeEventComponent },

  { selector: 'website-tiny-time-format', component: TimeFormatComponent },

  { selector: 'website-tiny-time-max', component: TimeMaxComponent },

  { selector: 'website-tiny-time-maxmin', component: TimeMaxminComponent },

  { selector: 'website-tiny-time-min', component: TimeMinComponent },

  {
    selector: 'website-tiny-time-option-disabled',
    component: TimeOptionDisabledComponent
  },

  {
    selector: 'website-tiny-time-panelalign',
    component: TimePanelalignComponent
  },

  { selector: 'website-tiny-time-reactive', component: TimeReactiveComponent },

  {
    selector: 'website-tiny-time-validation',
    component: TimeValidationComponent
  },

  {
    selector: 'website-tiny-timeline-basic',
    component: TimelineBasicComponent
  },

  { selector: 'website-tiny-timeline-dark', component: TimelineDarkComponent },

  {
    selector: 'website-tiny-timeline-helptip',
    component: TimelineHelptipComponent
  },

  {
    selector: 'website-tiny-timeline-multi',
    component: TimelineMultiComponent
  },

  {
    selector: 'website-tiny-timeline-templete',
    component: TimelineTempleteComponent
  },

  { selector: 'website-tiny-timeline-test', component: TimelineTestComponent },

  { selector: 'website-tiny-timeline-type', component: TimelineTypeComponent },

  { selector: 'website-tiny-tip-basic', component: TipBasicComponent },

  {
    selector: 'website-tiny-tip-content-comp',
    component: TipContentCompComponent
  },

  {
    selector: 'website-tiny-tip-content-template',
    component: TipContentTemplateComponent
  },

  { selector: 'website-tiny-tip-empty', component: TipEmptyComponent },

  { selector: 'website-tiny-tip-has-arrow', component: TipHasArrowComponent },

  {
    selector: 'website-tiny-tip-long-text-position',
    component: TipLongTextPositionComponent
  },

  { selector: 'website-tiny-tip-max-width', component: TipMaxWidthComponent },

  {
    selector: 'website-tiny-tip-position-test',
    component: TipPositionTestComponent
  },

  { selector: 'website-tiny-tip-position', component: TipPositionComponent },

  {
    selector: 'website-tiny-tip-service-destroy',
    component: TipServiceDestroyComponent
  },

  { selector: 'website-tiny-tip-service', component: TipServiceComponent },

  { selector: 'website-tiny-tip-trigger', component: TipTriggerComponent },

  {
    selector: 'website-tiny-tip-valid-position-test',
    component: TipValidPositionTestComponent
  },

  { selector: 'website-tiny-tip-zindex', component: TipZindexComponent },

  {
    selector: 'website-tiny-transfer-basic',
    component: TransferBasicComponent
  },

  {
    selector: 'website-tiny-transfer-disabled',
    component: TransferDisabledComponent
  },

  {
    selector: 'website-tiny-transfer-event',
    component: TransferEventComponent
  },

  { selector: 'website-tiny-transfer-id', component: TransferIdComponent },

  {
    selector: 'website-tiny-transfer-idkey',
    component: TransferIdkeyComponent
  },

  {
    selector: 'website-tiny-transfer-labelkey',
    component: TransferLabelkeyComponent
  },

  { selector: 'website-tiny-transfer-lazy', component: TransferLazyComponent },

  { selector: 'website-tiny-transfer-load', component: TransferLoadComponent },

  {
    selector: 'website-tiny-transfer-nodatatext',
    component: TransferNodatatextComponent
  },

  {
    selector: 'website-tiny-transfer-pagination',
    component: TransferPaginationComponent
  },

  {
    selector: 'website-tiny-transfer-placeholder',
    component: TransferPlaceholderComponent
  },

  {
    selector: 'website-tiny-transfer-searchable',
    component: TransferSearchableComponent
  },

  {
    selector: 'website-tiny-transfer-searchkeys',
    component: TransferSearchkeysComponent
  },

  { selector: 'website-tiny-transfer-size', component: TransferSizeComponent },

  {
    selector: 'website-tiny-transfer-table',
    component: TransferTableComponent
  },

  {
    selector: 'website-tiny-transfer-titles',
    component: TransferTitlesComponent
  },

  {
    selector: 'website-tiny-tree-before-expand',
    component: TreeBeforeExpandComponent
  },

  {
    selector: 'website-tiny-tree-before-more',
    component: TreeBeforeMoreComponent
  },

  {
    selector: 'website-tiny-tree-changedbycheckbox',
    component: TreeChangedbycheckboxComponent
  },

  {
    selector: 'website-tiny-tree-check-relation',
    component: TreeCheckRelationComponent
  },

  { selector: 'website-tiny-tree-disabled', component: TreeDisabledComponent },

  {
    selector: 'website-tiny-tree-drag-beforedrop',
    component: TreeDragBeforedropComponent
  },

  { selector: 'website-tiny-tree-drag', component: TreeDragComponent },

  { selector: 'website-tiny-tree-event', component: TreeEventComponent },

  { selector: 'website-tiny-tree-icon', component: TreeIconComponent },

  { selector: 'website-tiny-tree-load', component: TreeLoadComponent },

  { selector: 'website-tiny-tree-many', component: TreeManyComponent },

  {
    selector: 'website-tiny-tree-multiselect',
    component: TreeMultiselectComponent
  },

  { selector: 'website-tiny-tree-operate', component: TreeOperateComponent },

  {
    selector: 'website-tiny-tree-parentcheckable',
    component: TreeParentcheckableComponent
  },

  {
    selector: 'website-tiny-tree-radioselect',
    component: TreeRadioselectComponent
  },

  { selector: 'website-tiny-tree-search', component: TreeSearchComponent },

  {
    selector: 'website-tiny-tree-shortcutkey',
    component: TreeShortcutkeyComponent
  },

  { selector: 'website-tiny-tree-small', component: TreeSmallComponent },

  { selector: 'website-tiny-tree-template', component: TreeTemplateComponent },

  { selector: 'website-tiny-tree-util', component: TreeUtilComponent },

  {
    selector: 'website-tiny-tree-virtualscroll-drag',
    component: TreeVirtualscrollDragComponent
  },

  {
    selector: 'website-tiny-tree-virtualscroll-small',
    component: TreeVirtualscrollSmallComponent
  },

  {
    selector: 'website-tiny-tree-virtualscroll',
    component: TreeVirtualscrollComponent
  },

  {
    selector: 'website-tiny-treeselect-basic',
    component: TreeselectBasicComponent
  },

  {
    selector: 'website-tiny-treeselect-before-expand',
    component: TreeselectBeforeExpandComponent
  },

  {
    selector: 'website-tiny-treeselect-before-more',
    component: TreeselectBeforeMoreComponent
  },

  {
    selector: 'website-tiny-treeselect-clearable',
    component: TreeselectClearableComponent
  },

  {
    selector: 'website-tiny-treeselect-disabled',
    component: TreeselectDisabledComponent
  },

  {
    selector: 'website-tiny-treeselect-dropmaxheight',
    component: TreeselectDropmaxheightComponent
  },

  {
    selector: 'website-tiny-treeselect-event',
    component: TreeselectEventComponent
  },

  {
    selector: 'website-tiny-treeselect-focus',
    component: TreeselectFocusComponent
  },

  {
    selector: 'website-tiny-treeselect-labelkey',
    component: TreeselectLabelkeyComponent
  },

  {
    selector: 'website-tiny-treeselect-lazyload',
    component: TreeselectLazyloadComponent
  },

  {
    selector: 'website-tiny-treeselect-load',
    component: TreeselectLoadComponent
  },

  {
    selector: 'website-tiny-treeselect-maxline',
    component: TreeselectMaxlineComponent
  },

  {
    selector: 'website-tiny-treeselect-modal',
    component: TreeselectModalComponent
  },

  {
    selector: 'website-tiny-treeselect-multi',
    component: TreeselectMultiComponent
  },

  {
    selector: 'website-tiny-treeselect-nodata',
    component: TreeselectNodataComponent
  },

  {
    selector: 'website-tiny-treeselect-options-change',
    component: TreeselectOptionsChangeComponent
  },

  {
    selector: 'website-tiny-treeselect-panelwidth',
    component: TreeselectPanelwidthComponent
  },

  {
    selector: 'website-tiny-treeselect-search',
    component: TreeselectSearchComponent
  },

  {
    selector: 'website-tiny-treeselect-selectall',
    component: TreeselectSelectallComponent
  },

  {
    selector: 'website-tiny-treeselect-validation',
    component: TreeselectValidationComponent
  },

  {
    selector: 'website-tiny-upload-auto-upload',
    component: UploadAutoUploadComponent
  },

  { selector: 'website-tiny-upload-basic', component: UploadBasicComponent },

  {
    selector: 'website-tiny-upload-batch-send',
    component: UploadBatchSendComponent
  },

  {
    selector: 'website-tiny-upload-beforeremove',
    component: UploadBeforeremoveComponent
  },

  {
    selector: 'website-tiny-upload-button-test',
    component: UploadButtonTestComponent
  },

  { selector: 'website-tiny-upload-button', component: UploadButtonComponent },

  {
    selector: 'website-tiny-upload-case-test',
    component: UploadCaseTestComponent
  },

  {
    selector: 'website-tiny-upload-changes',
    component: UploadChangesComponent
  },

  {
    selector: 'website-tiny-upload-chunksize',
    component: UploadChunksizeComponent
  },

  { selector: 'website-tiny-upload-custom', component: UploadCustomComponent },

  { selector: 'website-tiny-upload-event', component: UploadEventComponent },

  { selector: 'website-tiny-upload-filter', component: UploadFilterComponent },

  {
    selector: 'website-tiny-upload-form-data',
    component: UploadFormDataComponent
  },

  {
    selector: 'website-tiny-upload-initfiles-test',
    component: UploadInitfilesTestComponent
  },

  {
    selector: 'website-tiny-upload-input-field-test',
    component: UploadInputFieldTestComponent
  },

  { selector: 'website-tiny-upload-props', component: UploadPropsComponent },

  {
    selector: 'website-tiny-upload-service-test',
    component: UploadServiceTestComponent
  },

  {
    selector: 'website-tiny-upload-service',
    component: UploadServiceComponent
  },

  { selector: 'website-tiny-upload-single', component: UploadSingleComponent },

  {
    selector: 'website-tiny-uploadimage-auto-upload',
    component: UploadimageAutoUploadComponent
  },

  {
    selector: 'website-tiny-uploadimage-basic',
    component: UploadimageBasicComponent
  },

  {
    selector: 'website-tiny-uploadimage-changes',
    component: UploadimageChangesComponent
  },

  {
    selector: 'website-tiny-uploadimage-deletable',
    component: UploadimageDeletableComponent
  },

  {
    selector: 'website-tiny-uploadimage-disabled',
    component: UploadimageDisabledComponent
  },

  {
    selector: 'website-tiny-uploadimage-drag',
    component: UploadimageDragComponent
  },

  {
    selector: 'website-tiny-uploadimage-event',
    component: UploadimageEventComponent
  },

  {
    selector: 'website-tiny-uploadimage-filter',
    component: UploadimageFilterComponent
  },

  {
    selector: 'website-tiny-uploadimage-initfiles',
    component: UploadimageInitfilesComponent
  },

  {
    selector: 'website-tiny-uploadimage-maxcount',
    component: UploadimageMaxcountComponent
  },

  {
    selector: 'website-tiny-uploadimage-template',
    component: UploadimageTemplateComponent
  },

  { selector: 'website-tiny-browser-usage', component: BrowserUsageComponent },

  { selector: 'website-tiny-keymap-usage', component: KeymapUsageComponent },

  { selector: 'website-tiny-log-usage', component: LogUsageComponent },

  { selector: 'website-tiny-theme-basic', component: ThemeBasicComponent },

  { selector: 'website-tiny-theme-palette', component: ThemePaletteComponent },

  {
    selector: 'website-tiny-validation-async-check-test',
    component: ValidationAsyncCheckTestComponent
  },

  {
    selector: 'website-tiny-validation-async-check',
    component: ValidationAsyncCheckComponent
  },

  {
    selector: 'website-tiny-validation-basic-control',
    component: ValidationBasicControlComponent
  },

  {
    selector: 'website-tiny-validation-basic-directive',
    component: ValidationBasicDirectiveComponent
  },

  {
    selector: 'website-tiny-validation-blur-check',
    component: ValidationBlurCheckComponent
  },

  {
    selector: 'website-tiny-validation-error-msg',
    component: ValidationErrorMsgComponent
  },

  {
    selector: 'website-tiny-validation-form-group-config',
    component: ValidationFormGroupConfigComponent
  },

  {
    selector: 'website-tiny-validation-form-group-test',
    component: ValidationFormGroupTestComponent
  },

  {
    selector: 'website-tiny-validation-form-group',
    component: ValidationFormGroupComponent
  },

  {
    selector: 'website-tiny-validation-param-change',
    component: ValidationParamChangeComponent
  },

  {
    selector: 'website-tiny-validation-pwd-check',
    component: ValidationPwdCheckComponent
  },

  {
    selector: 'website-tiny-validation-rules-custom-directive',
    component: ValidationRulesCustomDirectiveComponent
  },

  {
    selector: 'website-tiny-validation-rules-custom',
    component: ValidationRulesCustomComponent
  },

  {
    selector: 'website-tiny-validation-rules-test',
    component: ValidationRulesTestComponent
  },

  {
    selector: 'website-tiny-validation-template-form-nested',
    component: ValidationTemplateFormNestedComponent
  },

  {
    selector: 'website-tiny-validation-tip',
    component: ValidationTipComponent
  },

  {
    selector: 'website-tiny-validation-tiscroll',
    component: ValidationTiscrollComponent
  }
];

@NgModule({
  imports: [
    DemoModules.allModules,
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule // 因为modal,message,collapse,accordion组件使用了angular动画，所以需要引入此模块
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    // 国际化功能开启，测试其它语种的显示，可打开这段注释
    // 设置当前语言，默认为中文
    // TiLocale.setLocale(TiLocale.EN_US); // 设置国际化语种
    for (const item of WCS) {
      if (!customElements.get(item.selector)) {
        const el: any = createCustomElement(item.component, {
          injector: this.injector
        });
        customElements.define(item.selector, el);
      }
    }
  }

  ngDoBootstrap(): void {}
}
