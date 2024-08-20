export const passwordTemplate=`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f7;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            -webkit-text-size-adjust: none;
            width: 100%;
        }

        .email-wrapper {
            width: 100%;
            background-color: #f4f4f7;
            padding: 20px;
        }

        .email-content {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .email-header {
            text-align: center;
            margin-bottom: 20px;
        }

        .email-header img {
            width: 100px;
        }

        .email-body {
            font-size: 16px;
            color: #333333;
            line-height: 1.6;
        }

        .email-body h1 {
            font-size: 24px;
            color: #333333;
            margin-bottom: 20px;
        }

        .email-body p {
            margin-bottom: 20px;
        }

        .email-body a {
            color: #ffffff;
            background-color: #4CAF50;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            display: inline-block;
            margin-top: 10px;
        }

        .email-footer {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #888888;
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="email-content">
            <div class="email-header">
                <img src="dbitlogo.png" alt="Company Logo">
            </div>
            <div class="email-body">
                <h1>Welcome to Don Bosco Institute Of Technology</h1>
                <p>Dear <strong>{{fullName}}</strong>,</p>
                <p>We are pleased to inform you that your account has been successfully created. Below are your login credentials:</p>
                <p><strong>Password:</strong> <span style="color: #4CAF50;">{{password}}</span></p>
                <p>We recommend that you change your password after your first login to ensure the security of your account.</p>
               
            </div>
            <div class="email-footer">
                <p>If you have any questions, feel free to contact our support team.</p>
                <p>&copy; 2024 DBIT. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>

`
 // <a href="{{login_url}}" target="_blank">Login to Your Account</a>