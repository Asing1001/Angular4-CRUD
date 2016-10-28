import { Directive, ElementRef, AfterViewChecked, Output, EventEmitter, OnInit } from '@angular/core';

@Directive({
    selector: '[datePicker]'
})

export class DatePickertDirective implements OnInit {
    constructor(private element: ElementRef ) {
    }

    @Output() ngModelChange: EventEmitter<any> = new EventEmitter()
    value: any
    ngOnInit() {
        let $element = $(this.element.nativeElement);
        $element.bootstrapMaterialDatePicker({time:false});
        $element.on('change',()=>{
            this.ngModelChange.emit($element.val());
        })
    };
}
