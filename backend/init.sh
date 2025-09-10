#!/bin/sh
npm run db:migrate
npm run build
npm run db:seed
