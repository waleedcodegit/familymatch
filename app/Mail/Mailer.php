<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Mailer extends Mailable
{
    // public $code;

    use Queueable, SerializesModels;
    /**
     * Create a new message instance.
     *
     * 
     
     * @return void
     */
    public function __construct($body,$title,$subtitle)
    {
        // $this->$code = $code;
        view()->share('body', $body);        
        view()->share('title', $title);
        view()->share('subtitle', $subtitle);

    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject("Verify Your Email Address")->view('emails.EmailVerificator')->from("familymatchemail@gmail.com","FamilyMatch");
    }
}
