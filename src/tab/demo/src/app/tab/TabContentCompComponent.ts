import { Component, Injector, Input, Injectable } from '@angular/core';

@Component({
  templateUrl: './tab-content-comp.html'
})
export class TabContentCompComponent {
  title1: string = 'Libary';
  title2: string = 'Company';
  title3: string = 'Concert';
  active: boolean = true;
  type: string = 'pop song';

  tabs: Array<any> = [
    {
      title: 'Libary',
      component: LibaryComponent
    },
    {
      title: 'Company',
      active: true,
      component: CompanyComponent
    },
    {
      title: 'Concert1',
      component: Concert1Component,
      token: Greeter,
      data: { suffix: 'hippop', name: 'violet' } // 给组件传参
    }
  ];

  constructor(private injector: Injector) {}

  getInjector(tab: any): any {
    if (tab.token && tab.data) {
      return Injector.create([{ provide: tab.token, useValue: tab.data }], this.injector);
    }
  }
}

@Component({
  selector: 'app-libary',
  template: `<p>
    I'm the content component of <span style="color: red">{{ name }}</span
    >.
  </p>`
})
export class LibaryComponent {
  name: string = 'Libary';
}

@Component({
  selector: 'app-company',
  template: `<p>
    I'm the content component of <span style="color: green">{{ place }}</span
    >.
  </p>`
})
export class CompanyComponent {
  place: string = 'Company';
}

@Component({
  selector: 'app-concert',
  template: `<p>
      I'm the content component of <span style="color: blue">{{ text }}</span
      >.
    </p>
    <p>Params: {{ type }}</p>
    <p></p>`
})
export class ConcertComponent {
  text: string = 'Concert';
  @Input() type: string;
}

@Injectable()
export class Greeter {
  suffix: string;
  name: string;
}

@Component({
  selector: 'app-concert1',
  template: `<p>
      I'm the content component of <span style="color: blue">{{ text }}</span
      >.
    </p>
    <p>
      Params: <span style="color: red">{{ concert1.suffix }}</span>
    </p>
    <p></p>
    <p>
      Params: <span style="color: red">{{ concert1.name }}</span>
    </p>
    <p></p>`
})
export class Concert1Component {
  text: string = 'Concert1';
  constructor(public concert1: Greeter) {}
}
