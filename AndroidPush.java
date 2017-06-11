import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class AndroidPush {

    /**
     * Replace SERVER_KEY with your SERVER_KEY generated from FCM
     * Replace DEVICE_TOKEN with your DEVICE_TOKEN
     */
    private static String SERVER_KEY = "AAAA_li_enI:APA91bEMEwycWeO__ZwI6j163KZ32Wsa8eX6T-jColkIEa2fKofwor4nEf439GJURZMeQxLBYY3HeNl-VKREVLJD2zYGbXcJuUGTKdBRjUlNQT-PmV8LddBBIfnjs-W51bbxw9zsOzMx";
    private static String DEVICE_TOKEN = "fpRr754OmUQ:APA91bFja2wl4kfT622S8nn53sCL7jHoQXco6Juhzx8m4DKQGArhA05qxV0ChEMm2kBzh7I6vAOw-0TUgXWEe0oj9o0WoJ4n3GYclNQQxnm5Gb3vaaA6j3jm4xEjTAkPGPuJsLff7GY-";


    /**
     * USE THIS METHOD to send push notification
     */
    public static void main(String[] args) throws Exception {
        String title = "Need Help";
        String message = "How many planets are there in solar system?";
        sendPushNotification(title, message);
    }


    /**
     * Sends notification to mobile, YOU DON'T NEED TO UNDERSTAND THIS METHOD
     */
    private static void sendPushNotification(String title, String message) throws Exception {
        String pushMessage = "{\"data\":{\"title\":\"" +
                title +
                "\",\"message\":\"" +
                message +
                "\"},\"to\":\"" +
                DEVICE_TOKEN +
                "\"}";
        // Create connection to send FCM Message request.
        URL url = new URL("https://fcm.googleapis.com/fcm/send");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestProperty("Authorization", "key=" + SERVER_KEY);
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setRequestMethod("POST");
        conn.setDoOutput(true);

        // Send FCM message content.
        OutputStream outputStream = conn.getOutputStream();
        outputStream.write(pushMessage.getBytes());

        System.out.println(conn.getResponseCode());
        System.out.println(conn.getResponseMessage());
    }
}