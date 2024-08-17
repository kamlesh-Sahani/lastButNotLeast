export const approvalTemplate=`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Leave Application Approval</title>
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
    .leave-details {
      margin-top: 20px;
      border-collapse: collapse;
      width: 100%;
    }
    .leave-details th, .leave-details td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    .leave-details th {
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
      <h1>Leave Application Approval</h1>
    </div>
    
    <div class="content">
      <h2>Dear {{role}},</h2>
      <p>We are writing to inform you that the following leave application has been approved:</p>

      <table class="leave-details">
        <tr>
          <th>Employee Name</th>
          <td>{{faculty}}</td>
        </tr>
        <tr>
          <th>Department</th>
          <td>{{department}}</td>
        </tr>
        <tr>
          <th>Leave Type</th>
          <td>{{leaveType}}</td>
        </tr>
        <tr>
          <th>Start Date</th>
          <td>{{startDate}}</td>
        </tr>
        <tr>
          <th>End Date</th>
          <td>{{endDate}}td>
        </tr>
        <tr>
          <th>Reason</th>
          <td>{{reason}}</td>
        </tr>
      </table>
    </div>

    <div class="footer">
      <p>For more details or to review the application, please click the button below:</p>
      <a href="{{link}}" target="_blank">View Leave Application</a>
    </div>
  </div>

</body>
</html>

`