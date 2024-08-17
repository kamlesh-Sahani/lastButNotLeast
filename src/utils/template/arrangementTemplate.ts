export const arrangementTemplate=`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Teacher Arrangement Information</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding: 10px 0;
    }
    .header h1 {
      color: #333;
    }
    .content {
      margin-top: 20px;
    }
    .content h2 {
      color: #333;
    }
    .content p {
      color: #555;
      line-height: 1.6;
    }
    .arrangement-details {
      margin-top: 20px;
      border-collapse: collapse;
      width: 100%;
    }
    .arrangement-details th, .arrangement-details td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    .arrangement-details th {
      background-color: #f4f4f4;
      color: #333;
    }
    .footer {
      margin-top: 30px;
      text-align: center;
    }
    .footer a {
      color: #ffffff;
      background-color: #007BFF;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
    }
    .footer a:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>

  <div class="email-container">
    <div class="header">
      <h1>Teacher Arrangement Notification</h1>
    </div>
    
    <div class="content">
      <h2>Hello {{faculty}},</h2>
      <p>We would like to inform you about the following class arrangements that have been scheduled for you:</p>

      <table class="arrangement-details">
        <tr>
          <th>Course</th>
          <th>Subject</th>
          <th>Department</th>
          <th>Semester</th>
          <th>Time</th>
        </tr>
        <tr>
          <td>{{course}}</td>
          <td>{{subject}}</td>
          <td>{{department}}</td>
          <td>{{semester}}</td>
          <td>{{timing}}</td>
        </tr>
        <!-- Add more rows as needed -->
      </table>
    </div>

    <div class="footer">
      <p>To view more details or to confirm this arrangement, please click the button below:</p>
      <a href="{{link}}" target="_blank">View Details</a>
    </div>
  </div>

</body>
</html>

`