#!/bin/sh
npm run db:generate
npm run db:migrate
npm run build
npm run db:seed
