import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendaListaComponent } from './venda-lista.component';

describe('VendaListaComponent', () => {
  let component: VendaListaComponent;
  let fixture: ComponentFixture<VendaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendaListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
