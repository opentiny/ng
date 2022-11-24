import { Component, OnInit } from '@angular/core';
@Component({
  templateUrl: './tab-default-test.html',
  styles: [
    `
      .sum-color {
        color: red;
      }
    `,
  ],
})
export class TabDefaultTestComponent implements OnInit {
  hiden: boolean = false;
  tabsId: string = 'tabs_test';
  notShow: boolean = true;
  tab1: any = {
    id: 'tab1',
    sum: 26,
    active: false,
    title: '大法师',
    show: false,
  };
  otherTabs: Array<any> = [
    {
      title: 'Profile',
      id: 'tab2',
      disabled: true,
      active: false,
      content:
        "Raw denim you probably haven't heard of them jean shorts Austin. ",
      child: [{ title: 'daxiao' }, { title: 'hello' }],
    },
    {
      title: 'school',
      id: 'tab3',
      content: 'show me the school',
      active: false,
      child: [{ title: 'happy' }, { title: 'marray' }],
    },
    {
      title: 'About',
      id: 'tab4',
      content: 'Dynamic content 2',
      disabled: false,
      active: true,
      child: [{ title: 'tinger' }],
    },
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.tab1.show = true;
      this.notShow = false;
    }, 3000);
  }

  onActiveChange(isActive: boolean, tabId: string): void {
    if (isActive) {
      console.log(tabId, 'not active => active');
    } else {
      console.log(tabId, 'active => not active');
    }
  }

  showTabs(): void {
    this.hiden = !this.hiden;
  }

  activeTab3(): void {
    this.otherTabs[1]['active'] = true;
  }

  remove(): void {
    this.otherTabs.splice(1, 1);
  }

  add(): void {
    this.otherTabs.push({
      title: '添加',
      content: '添加的',
      active: true,
      child: [{ title: 'freedom' }],
    });
  }

  changeHeader(): void {
    this.otherTabs[1]['title'] = 'dfasl dajdjfaksj';
    this.tab1.title = 'Our Good and peaceful';
  }
}
