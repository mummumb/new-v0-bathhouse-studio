# Database Documentation

## Overview
This project uses SQLite with Prisma ORM for data persistence, replacing the previous JSON file-based storage to prevent content overwrites and enable concurrent editing.

## Database Schema

### Tables
- **JournalPost** - Blog posts with categories, author info, and content
- **Event** - Events with dates, pricing, capacity, and publishing status
- **PageContent** - Page sections with JSON content blocks
- **Ritual** - Service offerings with detailed descriptions and metadata
- **StandalonePage** - Full pages with hero sections and content

## Quick Start

### View Database
```bash
npm run db:studio
```
Opens Prisma Studio at http://localhost:5555 for visual database management.

### Common Commands

```bash
# Generate Prisma client after schema changes
npm run db:generate

# Push schema changes to database
npm run db:push

# Create a new migration
npm run db:migrate

# Reset database and re-seed
npm run db:reset

# Seed database with initial data
npm run db:seed

# Backup database
npm run db:backup

# Restore from backup
npm run db:restore
```

## Development Workflow

### 1. Making Schema Changes
1. Edit `prisma/schema.prisma`
2. Run `npm run db:push` to update database
3. Run `npm run db:generate` to update Prisma client

### 2. Adding New Data
- Use Prisma Studio (`npm run db:studio`) for manual edits
- Use API endpoints for programmatic access
- Create seed scripts in `scripts/` directory

### 3. Backing Up Data
```bash
# Create backup
npm run db:backup

# Backups are stored in backups/ directory
# Filename format: backup-YYYY-MM-DD-HH-mm-ss.json
```

### 4. Restoring Data
```bash
# Interactive restore
npm run db:restore

# Select from available backups
# Confirms before overwriting current data
```

## API Integration

All API routes have been updated to use the database:

### Events API
- `GET /api/events` - List all events
- `POST /api/events` - Create new event
- `GET /api/events/[id]` - Get single event
- `PUT /api/events/[id]` - Update event
- `DELETE /api/events/[id]` - Delete event

### Journal API
- `GET /api/journal` - List all posts
- `POST /api/journal` - Create new post
- `GET /api/journal/[id]` - Get single post
- `PUT /api/journal/[id]` - Update post
- `DELETE /api/journal/[id]` - Delete post

## Data Safety Features

1. **ACID Compliance** - SQLite ensures data integrity
2. **Automatic Timestamps** - createdAt/updatedAt on all records
3. **Unique Constraints** - Prevents duplicate slugs
4. **Schema Validation** - Prisma enforces data types
5. **Transaction Support** - Atomic updates prevent partial writes

## Troubleshooting

### Database Locked Error
If you see "database is locked" errors:
1. Close Prisma Studio if running
2. Ensure no other processes are accessing the database
3. Restart the development server

### Migration Issues
If migrations fail:
1. Backup current data: `npm run db:backup`
2. Reset database: `npm run db:reset`
3. Restore data: `npm run db:restore`

### Missing Data
If data appears missing:
1. Check Prisma Studio: `npm run db:studio`
2. Re-run seed scripts: `npm run db:seed`
3. Restore from backup if needed

## Production Considerations

For production deployment:
1. Consider migrating to PostgreSQL or MySQL
2. Set up automated backups
3. Configure connection pooling
4. Add database monitoring
5. Implement proper access controls

## File Locations

- **Database**: `prisma/bathhouse.db`
- **Schema**: `prisma/schema.prisma`
- **Backups**: `backups/`
- **Scripts**: `scripts/`
- **Generated Client**: `lib/generated/prisma/`