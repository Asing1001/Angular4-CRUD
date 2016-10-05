import { Directive, ElementRef, AfterViewChecked, Output, EventEmitter, OnInit } from '@angular/core';
import * as moment from 'moment';

@Directive({
    selector: '[datePicker]'
})

export class DatePickertDirective implements OnInit {
    constructor(private element: ElementRef ) {
    }

    @Output() ngModelChange: EventEmitter<any> = new EventEmitter()
    value: any
    ngOnInit() {
        $(this.element.nativeElement).bootstrapMaterialDatePicker('setDate', moment());
        $(this.element.nativeElement).on('change',()=>{
            this.ngModelChange.emit(this.element.nativeElement.value)
        })
    };
}
