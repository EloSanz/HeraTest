// Source code is decompiled from a .class file using FernFlower decompiler.
import database.ConexionBD;

import models.Competencias;
import models.Multimedial;
import models.Tipo_Competencia;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

public class Main {

    public static void main(String[] args) {
        List<Multimedial> multimedials = crearListaMultimediales();
        Connection conexion = null;
        PreparedStatement statement = null;
        ((Multimedial)multimedials.get(3)).setAddress("brasil 864");
        ((Multimedial)multimedials.get(3)).setBirthdate("2003-03-17");
        ((Multimedial)multimedials.get(3)).setEmail("sanzeliseo@yahoo.com.ar");
        ((Multimedial)multimedials.get(3)).setUser("elito");
        ((Multimedial)multimedials.get(3)).setPassword("velez");
        ((Multimedial)multimedials.get(3)).setEducationalLevel(1);
        ((Multimedial)multimedials.get(3)).setGraduation_institution("Universidad Nacional de La Matanza");

        try {
            try {
                conexion = ConexionBD.conectar();
            } catch (SQLException var9) {
                throw new RuntimeException(var9);
            }

            if (conexion != null) {
                ConexionBD.insertarMultimedial(multimedials.get(3));
                System.out.println("Conectado con éxito");
                //ConexionBD.eliminarMultimedial("multimedial", 4);
            }
        } catch (SQLException var10) {
            throw new RuntimeException(var10);
        } finally {
            ConexionBD.cerrarConexion(conexion);
        }

    }

    public static void testDb() throws SQLException {
        Connection conexion = null;
        PreparedStatement statement = null;
        ResultSet resultado = null;

        try {
            try {
                conexion = ConexionBD.conectar();
            } catch (SQLException var9) {
                throw new RuntimeException(var9);
            }

            if (conexion != null) {
                System.out.println("Conexion exitosa a la base de datos");
                String consulta = "SELECT id, username FROM multimedial";
                statement = conexion.prepareStatement(consulta);
                resultado = statement.executeQuery();

                while(resultado.next()) {
                    int id = resultado.getInt("id");
                    String nombre = resultado.getString("username");
                    System.out.println("ID: " + id + ", Nombre: " + nombre);
                }
            }
        } finally {
            ConexionBD.cerrarConexion(conexion);
        }

    }

    public static void mostrarPromedios(List<Multimedial> multimedials) {
        System.out.println("Promedio de destreza por tipo de competencia:");
        System.out.println("Tipo\t:\tPromedio");
        Iterator<Multimedial> var1 = multimedials.iterator();

        while(var1.hasNext()) {
            Multimedial m = (Multimedial)var1.next();
            m.imprimirPromedios();
        }

    }

    public static Competencias crearCompetenciasRandom() {
        Competencias competencias = new Competencias();
        Random random = new Random();
        competencias.agregarCompetencia(Tipo_Competencia.EDICION_VIDEO, "Adobe Premiere", random.nextInt(41) + 10);
        competencias.agregarCompetencia(Tipo_Competencia.EDICION_VIDEO, "Final Cut Pro", random.nextInt(41) + 10);
        competencias.agregarCompetencia(Tipo_Competencia.EDICION_VIDEO, "DaVinci Resolve", random.nextInt(41) + 10);
        competencias.agregarCompetencia(Tipo_Competencia.EDICION_IMAGEN, "Adobe Photoshop", random.nextInt(41) + 10);
        competencias.agregarCompetencia(Tipo_Competencia.EDICION_IMAGEN, "GIMP", random.nextInt(41) + 10);
        competencias.agregarCompetencia(Tipo_Competencia.EDICION_IMAGEN, "CorelDRAW", random.nextInt(41) + 10);
        return competencias;
    }

    public static List<Multimedial> crearListaMultimediales() {
        List<Multimedial> multimedials = new ArrayList<>();

        for(int i = 1; i <= 5; ++i) {
            multimedials.add(new Multimedial(i, crearCompetenciasRandom()));
        }

        return multimedials;
    }

    public static List<Integer> obtenerTop_N_Ids(List<Multimedial> multimedials, Tipo_Competencia tipoCompetencia, int n) {
        List<Integer> top_n_Ids = new ArrayList<>();
        List<PromedioMultimedial> promedios = new ArrayList<>();
        Iterator<Multimedial> var5 = multimedials.iterator();

        while(var5.hasNext()) {
            Multimedial multimedial = (Multimedial)var5.next();
            double promedio = (Double)multimedial.getCompetencias().calcularPromedioPorTipoCompetencia().getOrDefault(tipoCompetencia, 0.0);
            //double promedio = (Double)multimedial.getCompetencias().calcularPromedioPorTipoCompetencia().getOrDefault(tipoCompetencia, 0.0);
        }

        promedios.sort(Comparator.comparingDouble(PromedioMultimedial::getPromedio).reversed());

        int i;
        for(i = 0; i < Math.min(promedios.size(), n); ++i) {
            top_n_Ids.add(((PromedioMultimedial)promedios.get(i)).getId());
        }

        System.out.println("********* top:" + n + " " + String.valueOf(tipoCompetencia) + " *********");
        i = 1;

        for(Iterator var10 = top_n_Ids.iterator(); var10.hasNext(); ++i) {
            Integer int_ = (Integer)var10.next();
            System.out.println("" + i + ")id: " + int_);
        }

        return top_n_Ids;
    }
}
