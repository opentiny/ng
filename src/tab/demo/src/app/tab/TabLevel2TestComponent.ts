import { Component } from '@angular/core';

@Component({
  templateUrl: './tab-level2-test.html'
})
export class TabLevel2TestComponent {
  hiden: boolean = false;
  tabsId: string = 'tabs_test';
  tab1: any = {
    title: 'Home',
    id: 'tab1',
    active: false
  };
  otherTabs: Array<any> = [
    {
      title: 'Profile',
      id: 'tab2',
      active: true,
      disabled: false,
      content: `Raw denim you probably haven't heard of them jean shorts Austin. `
    },
    {
      title: 'school',
      id: 'tab3',
      content: 'show me the school'
    },
    {
      title: 'About',
      id: 'tab4',
      content: 'Dynamic content 2',
      disabled: true
    }
  ];

  onActiveChange(isActive: boolean): void {
    if (isActive) {
      console.log('not active => active');
    } else {
      console.log('active => not active');
    }
  }

  showTabs = (): void => {
    this.hiden = !this.hiden;
  };

  activeTab3 = (): void => {
    this.otherTabs[1]['active'] = true;
  };
}
