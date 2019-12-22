import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VenderDashbordPage } from './vender-dashbord.page';

describe('VenderDashbordPage', () => {
  let component: VenderDashbordPage;
  let fixture: ComponentFixture<VenderDashbordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenderDashbordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VenderDashbordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
