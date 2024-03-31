// Source code is decompiled from a .class file using FernFlower decompiler.
package database;

import models.Multimedial;

import java.sql.*;

public class ConexionBD {
    private static final String URL = "jdbc:postgresql://localhost:5432/heradb";
    private static final String USUARIO = "postgres";
    private static final String CONTRASENA = "eliseo";

    public ConexionBD() {
    }

    public static Connection conectar() throws SQLException {
        Connection conexion = null;

        try {
            Class.forName("org.postgresql.Driver");
            conexion = DriverManager.getConnection("jdbc:postgresql://localhost:5432/heradb", "postgres", "eliseo");
        } catch (ClassNotFoundException var2) {
            System.out.println("Controlador JDBC no encontrado: " + var2.getMessage());
        }

        return conexion;
    }

    public static void cerrarConexion(Connection conexion) {
        try {
            if (conexion != null) {
                conexion.close();
            }
        } catch (SQLException var2) {
            System.out.println("Error al cerrar la conexión: " + var2.getMessage());
        }

    }

    public static void insertarMultimedial(Multimedial multimedial) throws SQLException {
        Connection conexion = null;
        PreparedStatement statement = null;

        try {
            conexion = conectar();
            String consulta = "INSERT INTO multimedial (id, username, password, email, address, birthdate, educational_level_id, graduation_institution, profile_photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            statement = conexion.prepareStatement(consulta);
            statement.setInt(1, multimedial.getId());
            statement.setString(2, multimedial.getUser());
            statement.setString(3, multimedial.getPassword());
            statement.setString(4, multimedial.getEmail());
            statement.setString(5, multimedial.getAddress());
            String fecha = "2003-03-17";
            Date birthdate = Date.valueOf(fecha);
            statement.setDate(6, birthdate);
            statement.setInt(7, multimedial.getEducationalLevel());
            statement.setString(8, multimedial.getGraduation_institution());
            statement.setString(9, multimedial.getProfile_photo());
            statement.executeUpdate();
            System.out.println("Multimedial insertado correctamente en la base de datos");
        } finally {
            if (statement != null) {
                statement.close();
            }

            cerrarConexion(conexion);
        }

    }

    public static void eliminarMultimedial(String tabla, int id) throws SQLException {
        Connection conexion = null;
        PreparedStatement statement = null;

        try {
            conexion = conectar();
            String consulta = "DELETE FROM " + tabla + " WHERE id = ?";
            statement = conexion.prepareStatement(consulta);
            statement.setInt(1, id);
            int filasEliminadas = statement.executeUpdate();
            if (filasEliminadas > 0) {
                System.out.println("Se eliminó el multimedial con ID " + id + " de la base de datos");
            } else {
                System.out.println("No se encontró el multimedial con ID " + id);
            }
        } finally {
            if (statement != null) {
                statement.close();
            }

            cerrarConexion(conexion);
        }

    }
}
