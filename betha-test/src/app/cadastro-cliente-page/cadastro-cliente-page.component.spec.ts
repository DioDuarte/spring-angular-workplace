import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroClientePageComponent } from './cadastro-cliente-page.component';

describe('CadastroClientePageComponent', () => {
  let component: CadastroClientePageComponent;
  let fixture: ComponentFixture<CadastroClientePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroClientePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroClientePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
