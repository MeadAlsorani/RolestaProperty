import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as myGlobals from '../../assets/global';
@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  ngOnInit() {
    myGlobals.disableContainer(false);
  }

}
