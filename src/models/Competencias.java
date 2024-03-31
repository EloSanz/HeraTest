// Source code is decompiled from a .class file using FernFlower decompiler.
package models;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class Competencias {
    private Map<Tipo_Competencia, Map<String, Integer>> competencias = new HashMap();

    public Competencias() {
    }

    public String toString() {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("Competencias:\n");
        Iterator var2 = this.competencias.entrySet().iterator();

        while(var2.hasNext()) {
            Map.Entry<Tipo_Competencia, Map<String, Integer>> tipoEntry = (Map.Entry)var2.next();
            stringBuilder.append(tipoEntry.getKey()).append(":\n");
            Iterator var4 = ((Map)tipoEntry.getValue()).entrySet().iterator();

            while(var4.hasNext()) {
                Map.Entry<String, Integer> competenciaEntry = (Map.Entry)var4.next();
                stringBuilder.append("\t").append((String)competenciaEntry.getKey()).append(": ").append(competenciaEntry.getValue()).append("\n");
            }
        }

        return stringBuilder.toString();
    }

    public void agregarCompetencia(Tipo_Competencia tipoCompetencia, String nombreCompetencia, int nivelDestreza) {
        if (nivelDestreza >= 10 && nivelDestreza <= 50) {
            this.competencias.putIfAbsent(tipoCompetencia, new HashMap());
            ((Map)this.competencias.get(tipoCompetencia)).put(nombreCompetencia, nivelDestreza);
        } else {
            throw new IllegalArgumentException("El nivel de destreza debe estar entre 10 y 50");
        }
    }

    public Map<Tipo_Competencia, Double> calcularPromedioPorTipoCompetencia() {
        Map<Tipo_Competencia, Double> promedios = new HashMap();
        Iterator var2 = this.competencias.entrySet().iterator();

        while(var2.hasNext()) {
            Map.Entry<Tipo_Competencia, Map<String, Integer>> entry = (Map.Entry)var2.next();
            Tipo_Competencia tipoCompetencia = (Tipo_Competencia)entry.getKey();
            Map<String, Integer> competenciasPorTipo = (Map)entry.getValue();
            int totalNivelesDestreza = 0;
            int cantidadCompetencias = competenciasPorTipo.size();

            int nivelDestreza;
            for(Iterator var8 = competenciasPorTipo.values().iterator(); var8.hasNext(); totalNivelesDestreza += nivelDestreza) {
                nivelDestreza = (Integer)var8.next();
            }

            double promedio = cantidadCompetencias > 0 ? (double)totalNivelesDestreza / (double)cantidadCompetencias : 0.0;
            promedios.put(tipoCompetencia, promedio);
        }

        return promedios;
    }
    public double calcularPromedioDeCompetencia(Tipo_Competencia tipoCompetencia)
    {
        Map<Tipo_Competencia, Double> promedios = calcularPromedioPorTipoCompetencia();
        return promedios.getOrDefault(tipoCompetencia,0.0);
    }
}
