const mongoose = require('mongoose');
import 'dotenv/config';

mongoose.connect(process.env.db_connection_string);
