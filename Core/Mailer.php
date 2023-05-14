<?

namespace Core;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class Mailer {
	public $app;

	public function __construct($app) {
		$this->app = $app;
	}

	public function phpMailer($from, $to, $subject, $message) {
		$mail = new PHPMailer(true);

		try {
			$mail->SMTPDebug = 0;//SMTP::DEBUG_SERVER;
		    $mail->isSMTP();
		    $mail->CharSet = 'UTF-8';
		    $mail->Host = $this->app->config['phpmailer']['host'];
		    $mail->SMTPAuth = true;
		    $mail->Username = $this->app->config['phpmailer']['username'];
		    $mail->Password = $this->app->config['phpmailer']['password'];
		    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
		    $mail->Port = $this->app->config['phpmailer']['port'];
		    $mail->isHTML(true);

		    $mail->setFrom($from, $from);
		    $mail->addAddress($to);
		    $mail->Subject = $subject;
		    $mail->Body = $message;

		    $mail->send();
		    return ['success' => true];
		} catch(Exception $e) {

			$this->app->log('Mailer::phpMailer', [
				'from' => $from, 
				'to' => $to,
				'subject' => $subject,
				'message' => $message,
				'error' => $mail->ErrorInfo
			]);

			return [
				'success' => false,
				'message' => $this->app->t('mail_service_is_down')
			];
		}
	}

	public function sendUserActivationLink($user) {
		$message = $this->app->getMailTemplate()->makeMessage('activation_link', [
			'link' => $user->getActivationLink(),
			'domain' => $this->app->baseUrl
		]);
		$subject = $this->app->t('reg_confirm') . ' ' . $this->app->baseUrl;

		return $this->phpMailer(
			$this->app->config['no_reply_address'],
			$user->get('email'),
			$subject,
			$message
		);
	}

	public function sendForgotLink($user) {
		$message = $this->app->getMailTemplate()->makeMessage('forgot_link', [
			'link' => $user->getForgotLink(),
			'domain' => $this->app->baseUrl
		]);
		$subject = $this->app->t('password_recovery') . ' ' . $this->app->baseUrl;

		return $this->phpMailer(
			$this->app->config['no_reply_address'],
			$user->get('email'),
			$subject,
			$message
		);
	}

	public function sendFeedback($email, $orig_message) {
		$message = $this->app->getMailTemplate()->makeMessage('feedback', [
			'message' => strip_tags($orig_message),
			'email' => $email
		]);
		$subject = $this->app->t('feedback_from_site') . ' ' . $this->app->baseUrl;

		return $this->phpMailer(
			$this->app->config['no_reply_address'],
			$this->app->config['site_info_address'],
			$subject,
			$message
		);
	}
}