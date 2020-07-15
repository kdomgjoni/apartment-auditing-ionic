import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { IAppointment } from '../appointment.model';
import startCase from 'lodash-es/startCase';
import { Router } from '@angular/router';


@Component({
  selector: 'app-audit',
  templateUrl: './audit.page.html',
  styleUrls: ['./audit.page.scss'],
})
export class AuditPage implements OnInit {

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute, private router: Router) {
    const params = this.route.snapshot.params;
    this.itemRef = this.db.object<IAppointment>(`/appointments/${params.key}`);
    this.itemRef.valueChanges().subscribe(appointment => {
      const fields = appointment.units.map((unit, index) => {
        return this.getUnitFields(unit.type, index);
      });
      this.fields = fields.reduce((acc, e) => acc.concat(e), []);
      this.model = appointment;
    });
  }
  itemRef: AngularFireObject<IAppointment>;

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model = {};
  fields: FormlyFieldConfig[] = [{
    type: 'input', key: 'name', templateOptions: {
      label: 'Name'
    }
  }];


  UNIT_KEYS = {
    'room': ['lights', 'blinds', 'paint', 'carpet', 'door', 'alarm'],
    'kitchen': ['sink', 'stove', 'microwave', 'fridge'],
    'bath': ['lights', 'paint', 'floor', 'door', 'knobs'],
    'hall': ['lights', 'paint', 'carpet', 'door'],
    'patio': ['clean']
  };

  getUnitFields = (type: string, id: number): FormlyFieldConfig[] => {
    return [
      {
        template: `<h1>${startCase(type)}</h1>`,
      },
      ...this.UNIT_KEYS[type].flatMap(unitKey => {
        return this.getFields(id, unitKey);
      })
    ];
  };

  getFields = (id: number, key: string): FormlyFieldConfig[] => {
    const label = startCase(key);
    return [{
      key: `units.${id}.${key}`,
      type: 'radio',
      templateOptions: { required: true, label, options: [{ value: 'good', label: 'In Good Condition' }, { value: 'bad', label: 'In Bad Condition' }] }
    }, {
      key: `units.${id}.${key}Reason`, type: 'textarea',
      hideExpression: `model.units[${id}].${key} !== 'bad'`,
      templateOptions: {
        required: true,
        label: 'Reason',
        placeholder: `Reason for bad condition of ${label}`
      }
    }];
  }

  submit() {
    this.itemRef.update({
      ...this.model,
      status: this.form.invalid ? 'incomplete' : 'complete',
    });
    this.router.navigateByUrl('/home');
  }



  ngOnInit() {
  }

}
