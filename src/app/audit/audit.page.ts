import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { IAppointment } from '../appointment.model';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.page.html',
  styleUrls: ['./audit.page.scss'],
})
export class AuditPage implements OnInit {
  itemRef: AngularFireObject<IAppointment>;

  constructor(private db: AngularFireDatabase, private route:
    ActivatedRoute) {
    const params = this.route.snapshot.params;
    this.itemRef = this.db.object<IAppointment> (`/appointments/${params.key}`);
    this.itemRef.valueChanges().subscribe(appointment => {
      console.log(appointment);
    });
  }

  ngOnInit() {
  }

}
