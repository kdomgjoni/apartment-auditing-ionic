import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { IAppointment } from '../appointment.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  itemRef: AngularFireList<IAppointment>;
  appointments$: Observable<IAppointment[]>;

  data;

  constructor(private database: AngularFireDatabase) {
    this.itemRef = this.database.list('/appointments');
    this.appointments$ = this.itemRef.snapshotChanges().pipe(
      map((res) => {
        return res.map(value => {
          const appointment: IAppointment = value.payload.val();
          const count = appointment.units.reduce(this.bedsAndBathsCalc, { beds: 0, baths: 0 });
          const label = this.statusLabel(appointment.status);
          const color = this.statusColor(appointment.status);
          const roomsAndBaths = `${count.beds} BD ${count.baths}BT`;
          return {
            ...appointment,
            key: value.key,
            label,
            color,
            roomsAndBaths,
          };
        });
      }),
    );

  }

  ngOnInit() {
  }

  statusLabel(status) {
    return status === 'incomplete' ? 'Incomplete' : status === 'complete' ? 'Complete' : 'Not Started';
  }

  statusColor(status) {
    return status === 'incomplete' ? 'danger' : status === 'complete' ? 'success' : 'primary';
  }

  bedsAndBathsCalc(acc, curr) {
    if (curr.type === 'room') {
      acc.beds += 1;
    }
    if (curr.type === 'bath') {
      acc.baths += 1;
    }
    return acc;
  }
}
