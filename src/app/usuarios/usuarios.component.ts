import { Component, OnInit } from '@angular/core';
import { UsuarioService, Usuario } from '../services/usuarios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  nuevo: Usuario = { nombre: '', email: '' };
  editando: Usuario | null = null;

  constructor(private usuariosService: UsuarioService) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuariosService.obtenerUsuarios().subscribe(data => this.usuarios = data);
  }

  guardarUsuario() {
    if (this.editando) {
      this.usuariosService.actualizarUsuario(this.editando.id!, this.nuevo).subscribe(() => {
        this.cargarUsuarios();
        this.cancelarEdicion();
      });
    } else {
      this.usuariosService.crearUsuario(this.nuevo).subscribe(() => {
        this.cargarUsuarios();
        this.nuevo = { nombre: '', email: '' };
      });
    }
  }

  editarUsuario(usuario: Usuario) {
    this.editando = usuario;
    this.nuevo = { ...usuario };
  }

  cancelarEdicion() {
    this.editando = null;
    this.nuevo = { nombre: '', email: '' };
  }

  eliminarUsuario(id: number) {
    this.usuariosService.eliminarUsuario(id).subscribe(() => this.cargarUsuarios());
  }
}
