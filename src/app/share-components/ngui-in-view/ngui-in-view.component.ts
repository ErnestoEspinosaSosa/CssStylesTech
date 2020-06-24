import { Component, OnInit, OnDestroy, TemplateRef,
  Input, Output, EventEmitter, ElementRef, Renderer2, Inject, PLATFORM_ID, ContentChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'ngui-in-view',
  templateUrl: './ngui-in-view.component.html',
  styles: [':host {display: block;}']
})
export class NguiInViewComponent implements OnInit, OnDestroy {
  observer: IntersectionObserver;
  inView = false;
  once50PctVisible = false;

  @ContentChild(TemplateRef, {read: null, static: true}) template: TemplateRef<any>;
  @Input() options: any = { threshold: [.1, .2, .3, .4, .5, .6, .7, .8] };
  @Output('inView') inView$: EventEmitter<any> = new EventEmitter();
  @Output('notInView') notInView$: EventEmitter<any> = new EventEmitter();

  constructor(
    public element: ElementRef,
    public renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.options);
      this.observer.observe(this.element.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  handleIntersect(entries, observer): void {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        this.inView = true;
        this.inView$.emit(entry);
      } else {
        this.notInView$.emit(entry);
      }
    });
  }
}
