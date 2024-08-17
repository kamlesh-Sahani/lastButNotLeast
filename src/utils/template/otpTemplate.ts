export const otpTemplate=`
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            padding-bottom: 20px;
        }

        .header img {
            width: 100px;
            margin-bottom: 20px;
        }

        .header h1 {
            font-size: 24px;
            color: #333333;
        }

        .content {
            font-size: 16px;
            color: #555555;
            line-height: 1.6;
        }

        .otp-code {
            display: inline-block;
            background-color: #007bff;
            color: #ffffff;
            font-size: 24px;
            padding: 10px 20px;
            border-radius: 8px;
            margin: 20px 0;
            letter-spacing: 4px;
        }

        .footer {
            text-align: center;
            padding-top: 20px;
            font-size: 14px;
            color: #aaaaaa;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <img src="dbitlogo.png" alt="Logo">
            <h1>Verify Your Email</h1>
        </div>
        <div class="content">
            <p>Hello {{username}},</p>
            <p>We received a request to verify your email address. Please use the OTP code below to complete your
                verification:</p>
            <div class="otp-code">{{otp}}</div>
            <p>If you did not request this, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Don Bosco Institute Of Technology</p>
        </div>
    </div>
</body>

</html>

`