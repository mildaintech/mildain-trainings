import React from 'react';
import Link from 'next/link';

export default function TermsConditions() {
  return (
    <>
      <div className="bg-slate-900 px-8 py-12 md:px-12 md:py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Terms &amp; Conditions
          </h1>
          <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
            <span>Last Updated:</span>
            <span className="text-primary font-bold bg-primary/10 px-2 py-1 rounded-md">16 October 2026</span>
          </div>
        </div>
      </div>

      <div className="p-8 md:p-12 space-y-10 text-slate-600 text-[16px] leading-[1.8]">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm">1</span>
            Introduction
          </h2>
          <p>
            Greetings from Mildain Trainings. These Terms &amp; Conditions demonstrate how you can use our
            website, enroll in our training programs, and access our services. They also outline the
            responsibilities of Mildain Trainings, our learners, and customers.
          </p>
          <p>
            The &ldquo;Terms&rdquo; and Conditions listed below control the use of the Mildain Trainings website
            (<a href="https://mildaintrainings.com/" className="text-primary hover:underline font-semibold transition-all" target="_blank" rel="noopener noreferrer">https://mildaintrainings.com/</a>) and our training services. By accessing this site or by enrolling
            in any of the training programs, you agree to abide by these Terms.
          </p>
        </section>

        <div className="w-full h-px bg-slate-100"></div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm">2</span>
            Website Use and Services
          </h2>
          <p>
            Mildain Training offers professional training, certification preparation, and learning solutions
            for people and enterprises. We have published course descriptions/details, schedules, delivery
            modes, and other necessary information to help learners make informed decisions.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
              <span>You hereby agree that you are using this website for lawful purposes.</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
              <span>You must not misuse its features or seek unauthorized access</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
              <span>You will not intend to interrupt its operations</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
              <span>You do not aim to/submit misleading, unlawful, or harmful information</span>
            </li>
          </ul>
        </section>

        <div className="w-full h-px bg-slate-100"></div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm">3</span>
            Registration and Course Enrollment
          </h2>
          <p>
            Some of our courses may require registration or the submission of personal or professional
            information. You are responsible for providing complete, accurate, and updated details during
            enrollment.
          </p>
          <p className="font-semibold text-slate-800">As you register, you agree to the following:</p>
          <ul className="space-y-3 pl-2">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
              <span>You must provide true and reliable information/data and update it whenever necessary.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
              <span>You must keep your credentials (username/ID/password/OTP/security questions) secret where applicable.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
              <span>You must ensure that the selected course complies with your learning requirements before registering.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
              <span>You must inform us if you believe that your data and account are not safe.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
              <span>Give honest and reliable information and update it when necessary.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
              <span>Keep your account credentials (username/ID/password/OTP/Security questions, etc.) confidential, where applicable.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
              <span>Before enrolling, make sure the selected course meets your learning needs.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
              <span>Inform us on priority if you suspect unauthorized use of your account or information.</span>
            </li>
          </ul>
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg text-blue-800 text-sm mt-4">
            Enrollment in the training program will depend on its availability and confirmation by Mildain.
            Simply registering for a course does not guarantee admission until the relevant enrollment
            procedure is completed.
          </div>
        </section>

        <div className="w-full h-px bg-slate-100"></div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm">4</span>
            Training Delivery and Schedules
          </h2>
          <p>Mildain have three listed modes of training namely:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="bg-white border border-slate-200 shadow-sm p-5 rounded-xl hover:border-primary transition-colors">
              <h3 className="font-bold text-slate-900 mb-2">Online</h3>
              <p className="text-sm">Virtual classroom setup where trainer and trainee both have flexibility.</p>
            </div>
            <div className="bg-white border border-slate-200 shadow-sm p-5 rounded-xl hover:border-primary transition-colors">
              <h3 className="font-bold text-slate-900 mb-2">Offline</h3>
              <p className="text-sm">Live classroom/workshop/labs available that give the learner free rein over their learning needs.</p>
            </div>
            <div className="bg-white border border-slate-200 shadow-sm p-5 rounded-xl hover:border-primary transition-colors">
              <h3 className="font-bold text-slate-900 mb-2">Fly-me-a-Trainer Onsite</h3>
              <p className="text-sm">Enterprises who want to upskill their workforce majorly opt for this training feature. Mildain sends the certified trainer to the required location to train the workforce.</p>
            </div>
          </div>
          <p>
            It must be noted that training delivery arrangements may occasionally change due to
            operational requirements or unforeseen circumstances. As far as possible, we will make sure
            that students are aware of any major changes (for example, replacement lectures, changes in
            schedule) after registration. Any other arrangements made will be compliant with the principles
            of the course and our policies.
          </p>
        </section>

        <div className="w-full h-px bg-slate-100"></div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm">5</span>
            Fees, Cancellations, and Refunds
          </h2>
          <p>
            The amount of course fees, payment conditions, and relevant taxes or charges will be explained
            at the time of enrollment. You will be responsible for paying the designated fees within the
            specified timeframe.
          </p>
          <p>
            Related to cancellations and refunds, etc., our separate Cancellation and Refund Policy
            applies. Make sure that you check this policy before making your payment and, where it&#39;s
            applicable, the terms communicated at enrollment will also apply.
          </p>
        </section>

        <div className="w-full h-px bg-slate-100"></div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm">6</span>
            Learner Responsibilities and Conduct
          </h2>
          <p>
            We expect all learners enrolled to contribute to a respectful, professional, and productive
            learning environment. You are agreeing to:
          </p>
          <ul className="space-y-3 pl-2">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></div>
              <span>Participate in the organized sessions in a responsible manner.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></div>
              <span>Deal with all fellow learners, trainers, and employees respectfully and with dignity.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></div>
              <span>Adhere to the course and rules of the platform.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></div>
              <span>Do not share any unauthorized access links, confidential information, or restricted course-related materials.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></div>
              <span>Attend the sessions organized and participate in them in a responsible way.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></div>
              <span>Be respectful to the employees, trainers, and co-learners.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></div>
              <span>Comply with the course instructions and the platform rules.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></div>
              <span>Avoid sharing unauthorized access links, confidential information, or restricted materials related to the course.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></div>
              <span>Refrain from any disruptive or illegal behavior during and after the training process.</span>
            </li>
          </ul>
          <p className="mt-4 font-medium text-slate-700">
            If found violating any of these terms, we may restrict your access to a session or a service. You
            will be subject to applicable law and relevant course policies.
          </p>
        </section>

        <div className="w-full h-px bg-slate-100"></div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm">7</span>
            Intellectual Property and Course Materials
          </h2>
          <p>
            The content of the website, which includes texts, graphics, logos, course contents, videos,
            presentations, and educational materials, is owned by Mildain or their respective licensor unless
            otherwise stated and is protected by corresponding intellectual property legislation.
          </p>
          <p>
            The materials received as part of training programs can be used only for personal education or
            for other specified purposes mentioned in the corporate training agreement. You are not allowed
            to reproduce, publish, sell, distribute, record, modify, or exploit them in any commercial way
            without prior written consent from the respective owner of the rights to use it.
          </p>
        </section>

        <div className="w-full h-px bg-slate-100"></div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm">8</span>
            Certification and Career Outcomes
          </h2>
          <p>
            Mildain may provide training in order to help students prepare for professional certification,
            examination, or career advancement. Nevertheless, the decisions concerning certification,
            examination timetable, eligibility criteria, and the process of awarding credentials are made by
            the certification body.
          </p>
          <p>
            Completing training does not guarantee that the students will pass the examination, acquire the
            certification, get a job or promotion, or achieve a certain salary. Result will solely depend on an
            individual&#39;s experience, performance metrics, market conditions, and other factors beyond our
            control.
          </p>
        </section>

        <div className="w-full h-px bg-slate-100"></div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm">9</span>
            Corporate Training Solutions
          </h2>
          <p>
            Corporate training programs can include customized content, training schedules, total number
            of trainees, costs, and more. Specific terms may be set out in a different proposal, statement of
            work, purchase order, or agreement.
          </p>
          <p>
            If a separate agreement goes against these Terms and Conditions, the terms and conditions of
            that agreement will apply.
          </p>
        </section>

        <div className="w-full h-px bg-slate-100"></div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm">10</span>
            Privacy and Third-Party Services
          </h2>
          <p>
            We process personal data in line with our existing policies and regulatory requirements. Refer to
            our Privacy Policy to learn how we gather your information, use it, and ensure its safety.
          </p>
          <Link href="/privacy" className="inline-flex items-center justify-center px-6 py-2.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-sm mt-2 mb-4">
            Read our Privacy Policy here
          </Link>
          <p className="mt-4">
            Our website contains links to third-party platforms and services. These are intended for your
            convenience. Mildain is not responsible for the reliability, data privacy, content, availability and
            security practices offered by the independent third parties.
          </p>
        </section>

        <div className="w-full h-px bg-slate-100"></div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm">11</span>
            Website Availability and Limitation of Liability
          </h2>
          <p>
            We make reasonable efforts to ensure that the Website is accurate and accessible for all users.
            Nonetheless, the continuous availability, perfect functionality, and the completeness of content
            on the site cannot be assured.
          </p>
          <p>
            Relevant to the regulations where it is legally acceptable, Mildain shall not be responsible for
            indirect, incidental or consequential damages that would arise from the utilization of the
            Website or training services. There is nothing in these Terms that excludes or limits liability
            where such prohibition of exclusion or limitation is applicable by law.
          </p>
        </section>

        <div className="w-full h-px bg-slate-100"></div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm">12</span>
            Suspension and Changes to Services
          </h2>
          <p>
            There are situations when we might need to modify, minimize, or terminate certain sections of
            our site or services to accommodate maintenance activities, technical issues, safety constraints
            or any laws applicable to us.
          </p>
          <p>
            We will try our best to notify users who have completed the registration process of significant
            changes to the website or services if necessary. In case of a serious breach of these Terms, the
            access may be denied in accordance with the laws.
          </p>
        </section>

        <div className="w-full h-px bg-slate-100"></div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm">13</span>
            Changes to These Terms
          </h2>
          <p>
            Mildain has the authority to modify these Terms when needed. The new version will appear on
            this page and it may have a new date. Once you continue accessing the Website after such
            amendments, you are considered to have accepted the new version of the Terms.
          </p>
        </section>

        <div className="w-full h-px bg-slate-100"></div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm">14</span>
            Governing Law and Contact Information
          </h2>
          <p>
            The Terms are regulated under the laws of India taking into account relevant legal norms. In
            case of any disputes, the matter will be presented in the relevant court.
          </p>
          <p>
            If you have any issue regarding the Terms, questions related to the enrollment in courses or any
            inquiry about our services, please contact us through the provided contact information.
          </p>

        </section>

      </div>
    </>
  );
}