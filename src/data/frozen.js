/**
 * src/data/frozen.js
 * Verbatim text of the three engineering case studies from reference/artifact-index.html.
 * Per spec R6 and J1, this copy is FROZEN. Do not change, reword, or modernize.
 */
export const frozenEngineeringStudies = [
  {
    title: 'A job queue that survives crashes',
    stack: 'Next.js, Prisma, PostgreSQL, a separate worker process',
    problem: 'Sending an email should not slow down the request, and it must not be sent twice if something fails halfway. I wanted every job\'s real outcome to be provable, not assumed.',
    role: 'Solo. I wrote the spec and the data design before any code, directed the coding agent, and authorised and checked the break-it tests.',
    whatBuilt: 'A job table with five states (pending, processing, succeeded, failed, dead) and a worker that claims jobs with a database lock so two workers never take the same one. Failed jobs retry with growing delays, and a job that keeps failing lands in a dead-letter view. A sweep recovers jobs left stuck by a dead worker.',
    keyDecisions: [
      'Repeat requests are stopped by a unique constraint in the database, not by a check in the code.',
      '"Failed" (will retry) and "dead" (needs a person) are different states.',
      'The email log row is written before the provider is called, so a crashed worker cannot send twice.'
    ],
    result: 'Five break-it tests on a real Postgres. With 50 jobs and a cap of three at once, the worker never exceeded three. A job that always failed retried with growing gaps (about 4, 8, 17 and 37 seconds) and then went dead on attempt five. After I killed the worker process, the sweep recovered the job and it finished once. Two workers on 20 jobs never took the same job twice.',
    links: [
      { text: 'Code', href: 'https://github.com/Antisocialworld/job-queue' },
      { text: 'Full write-up', href: 'https://github.com/Antisocialworld/job-queue/blob/main/DOCUMENTATION.md' }
    ]
  },
  {
    title: 'Subscriptions and payments, in test mode',
    stack: 'Next.js, Prisma, PostgreSQL, Flutterwave',
    problem: 'Let a user subscribe, upgrade, downgrade, cancel and resume, without charging twice or giving access they have not paid for.',
    role: 'Solo. I specified the flows and the proration rule, directed the coding agent, and checked each flow against the database.',
    whatBuilt: 'Hosted checkout with a monthly plan (NGN 4,000) and a yearly plan (NGN 40,000). Upgrades charge only the prorated difference, calculated on the server. Downgrades apply at the end of the period. Cancelling keeps access until the paid period ends. Every payment event goes into an append-only log, and the webhook checks an HMAC-SHA256 signature over the raw request body.',
    keyDecisions: [
      'The server decides the amount. The browser never does.',
      'Granting access happens inside one database transaction that locks the payment record first.',
      'Cancellation keeps the real period end, and I added Resume after manual testing showed a user had no way back.'
    ],
    result: 'My own testing found two real bugs. An upgrade went down the subscribe path and extended a monthly plan instead of switching it to yearly. Then two near-simultaneous loads of the return page could both grant a subscription. Fixing the second with a row lock gave one payment, one grant, and a period extended exactly once. The write-up records both, along with what is not built.',
    links: [
      { text: 'Code', href: 'https://github.com/Antisocialworld/payment-subscription-slice' },
      { text: 'Full write-up', href: 'https://github.com/Antisocialworld/payment-subscription-slice/blob/main/DOCUMENTATION.md' }
    ]
  },
  {
    title: 'Sign-in that ends when you sign out',
    stack: 'Next.js, Prisma, SQLite, Zod, bcrypt',
    problem: 'Build account creation, email verification, sign-in, password reset and a protected page as one small flow, and document every decision and limit.',
    role: 'Solo. I wrote the spec, directed the coding agent, and checked its evidence for each behaviour.',
    whatBuilt: 'Sign-up with a six-digit emailed code, sign-in with sessions stored in the database, password reset by emailed link, a dashboard that redirects when you are signed out, and rate limits on the sensitive routes.',
    keyDecisions: [
      'The cookie holds only a session ID, so signing out ends the session at once.',
      'One Zod schema validates the form in the browser and again on the server.',
      'The known weak spots are written down with their production fixes: an in-memory rate limiter, codes stored in plain text, and SQLite.'
    ],
    result: 'The rate limiter was tested with five failed sign-ups followed by a rejection on the sixth. The write-up also records a rate-limit reset caused by a dev-server reload, a database driver mismatch, and a Windows quoting problem that corrupted test requests.',
    links: [
      { text: 'Code', href: 'https://github.com/Antisocialworld/Authentication-Slice' },
      { text: 'Full write-up', href: 'https://github.com/Antisocialworld/Authentication-Slice/blob/master/DOCUMENTATION.md' }
    ]
  }
];
