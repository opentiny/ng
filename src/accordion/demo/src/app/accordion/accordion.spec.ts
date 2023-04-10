import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TiAccordionComponent, TiAccordionItemComponent, TiAccordionHeadComponent } from '../../../../lib/src/TiAccordionModule';
import { AccordionBasicComponent } from './AccordionBasicComponent';
import { AccordionOpenComponent } from './AccordionOpenComponent';

describe('accordion', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [
        TiAccordionComponent,
        TiAccordionItemComponent,
        TiAccordionHeadComponent,
        AccordionBasicComponent,
        AccordionOpenComponent
      ]
    }).compileComponents();
  });

  describe('accordion basic', () => {
    let fixture: ComponentFixture<AccordionBasicComponent>;
    let accordion: DebugElement;
    let items: DebugElement[];

    beforeEach(() => {
      fixture = TestBed.createComponent(AccordionBasicComponent);
      fixture.detectChanges();
      accordion = fixture.debugElement.query(By.directive(TiAccordionComponent));
      items = fixture.debugElement.queryAll(By.directive(TiAccordionItemComponent));
    });

    it('should component defined', () => {
      fixture.detectChanges();
      expect(accordion).toBeDefined();
      expect(items).toBeDefined();
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(accordion.nativeElement!.classList).toContain('ti3-accordion-group');
      expect(items[0].nativeElement!.classList).toContain('ti3-accordion-panel');
    });
  });

  describe('accordion open', () => {
    let fixture: ComponentFixture<AccordionOpenComponent>;
    let testComponent: AccordionOpenComponent;
    let accordion: DebugElement;
    let items: DebugElement[];

    beforeEach(() => {
      fixture = TestBed.createComponent(AccordionOpenComponent);
      fixture.detectChanges();
      testComponent = fixture.componentInstance;
      accordion = fixture.debugElement.query(By.directive(TiAccordionComponent));
      items = fixture.debugElement.queryAll(By.directive(TiAccordionItemComponent));
    });

    it('should open api correct', fakeAsync(() => {
      fixture.detectChanges();
      expect(testComponent.isOpen).toBeTrue();
      testComponent.isOpen = false;
      fixture.detectChanges();
      tick();
      expect(testComponent.isOpen).toBeFalse();
    }));

    it('should style correct when open changed', fakeAsync(() => {
      fixture.detectChanges();
      let firstItem: DebugElement = items[0].children[1];
      let secondItem: DebugElement = items[1].children[1];
      expect(firstItem.nativeElement.clientHeight).toBeGreaterThan(0);
      expect(secondItem.nativeElement.clientHeight).toBe(0);
      testComponent.isOpen = false;
      fixture.detectChanges();
      tick();
      expect(firstItem.nativeElement.clientHeight).toBe(0);
      expect(secondItem.nativeElement.clientHeight).toBe(0);
    }));
  });
});
