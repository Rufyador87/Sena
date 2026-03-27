package com.optilogistics.modelo;

/**
 * Entidad de dominio para representar un vehículo dentro del sistema
 * de asignación logística.
 */
public class Vehiculo {

    private int id;
    private String placa;
    private String conductor;
    private String empresaTransportadora;
    private String estado;

    public Vehiculo() {
    }

    public Vehiculo(int id, String placa, String conductor, String empresaTransportadora, String estado) {
        this.id = id;
        this.placa = placa;
        this.conductor = conductor;
        this.empresaTransportadora = empresaTransportadora;
        this.estado = estado;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public String getConductor() {
        return conductor;
    }

    public void setConductor(String conductor) {
        this.conductor = conductor;
    }

    public String getEmpresaTransportadora() {
        return empresaTransportadora;
    }

    public void setEmpresaTransportadora(String empresaTransportadora) {
        this.empresaTransportadora = empresaTransportadora;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
