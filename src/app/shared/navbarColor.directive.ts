import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appNavbarColor]',
})
export class NavbarColorDirective {
  scroll;
  constructor(private el: ElementRef) {}
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    this.scroll = window.pageYOffset;
    if (this.scroll > 60) {
      this.el.nativeElement.style.backgroundColor =
        'rgba(1, 30, 74,' + this.scroll + '%)';
    }
    else{
      this.el.nativeElement.style.background =
        'linear-gradient(to bottom, rgba(0, 0, 0, .8), rgba(0, 0, 0, .5), rgba(0, 0, 0, 0))rgba(0, 0, 0, .5)';
    }
  }
}
