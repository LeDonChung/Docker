import redis.clients.jedis.Jedis;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class Worker {
    public static void main(String[] args) {
        Jedis jedis = new Jedis("redis");
        try {
            Connection conn = DriverManager.getConnection(
                "jdbc:postgresql://db:5432/postgres", "postgres", "postgres"
            );

            String vote;
            while (true) {
                vote = jedis.blpop(0, "votes").get(1);
                PreparedStatement stmt = conn.prepareStatement(
                    "INSERT INTO votes(option) VALUES(?)"
                );
                stmt.setString(1, vote);
                stmt.executeUpdate();
                stmt.close();
                System.out.println("Vote processed: " + vote);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
