// Source code is decompiled from a .class file using FernFlower decompiler.
package models;

import java.io.PrintStream;
import java.util.Iterator;
import java.util.Map;

public class Multimedial {
    private final int id;
    private String user;
    private String password;
    private String email;
    private String address;
    private String birthdate;
    private int educationalLevel;
    private String graduation_institution;
    private final Competencias competencias;
    private String profile_photo;

    public String getUser() {
        return this.user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setBirthdate(String birthdate) {
        this.birthdate = birthdate;
    }

    public void setEducationalLevel(int educationalLevel) {
        this.educationalLevel = educationalLevel;
    }

    public int getEducationalLevel() {
        return this.educationalLevel;
    }

    public void setGraduation_institution(String graduation_institution) {
        this.graduation_institution = graduation_institution;
    }

    public void setProfile_photo(String profile_photo) {
        this.profile_photo = profile_photo;
    }

    public String getPassword() {
        return this.password;
    }

    public String getEmail() {
        return this.email;
    }

    public String getAddress() {
        return this.address;
    }

    public String getBirthdate() {
        return this.birthdate;
    }

    public String getGraduation_institution() {
        return this.graduation_institution;
    }

    public double promedioPorTipoCompetencia(Tipo_Competencia tipoCompetencia)
    {
        return this.competencias.calcularPromedioDeCompetencia(tipoCompetencia);
    }
    public String getProfile_photo() {
        return this.profile_photo;
    }

    public Multimedial(int id, Competencias competencias) {
        this.id = id;
        this.competencias = competencias;
    }

    @Override
    public String toString() {
        return "id: " + id + "\n" + String.valueOf(this.competencias);
    }

    public int getId() {
        return this.id;
    }

    public Competencias getCompetencias() {
        return this.competencias;
    }

    public void agregarCompetencia(Tipo_Competencia tipoCompetencia, String nombreCompetencia, int nivelDestreza) {
        if (nivelDestreza >= 10 && nivelDestreza <= 50) {
            this.competencias.agregarCompetencia(tipoCompetencia, nombreCompetencia, nivelDestreza);
        } else {
            throw new IllegalArgumentException("El nivel de destreza debe estar entre 10 y 50");
        }
    }

    public Map<Tipo_Competencia, Double> calcularPromedioPorTipoCompetencia() {
        return this.competencias.calcularPromedioPorTipoCompetencia();
    }

    public void imprimirPromedios() {
        System.out.println("id: " + this.id);
        Map<Tipo_Competencia, Double> promedios = this.competencias.calcularPromedioPorTipoCompetencia();
        Iterator var2 = promedios.entrySet().iterator();

        while(var2.hasNext()) {
            Map.Entry<Tipo_Competencia, Double> entry = (Map.Entry)var2.next();
            PrintStream var10000 = System.out;
            String var10001 = String.valueOf(entry.getKey());
            var10000.println(var10001 + ": " + String.valueOf(entry.getValue()));
        }

    }
}
