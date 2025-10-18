# Deployment Guide

This guide covers deploying your Tic Tac Toe multiplayer application to production.

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the company behind Next.js and offers the best integration.

#### Prerequisites
- GitHub/GitLab/Bitbucket account
- Vercel account ([Sign up](https://vercel.com/signup))

#### Steps

1. **Push Code to Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import Project to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your Git repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   - In project settings, go to "Environment Variables"
   - Add `MONGODB_URI` with your MongoDB Atlas connection string
   - Click "Save"

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)
   - Your app is live!

#### Custom Domain (Optional)
1. Go to project settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate is automatically provisioned

#### Automatic Deployments
- Every push to `main` branch triggers a new deployment
- Preview deployments for pull requests
- Instant rollback capability

---

### Option 2: Netlify

#### Prerequisites
- GitHub/GitLab/Bitbucket account
- Netlify account ([Sign up](https://app.netlify.com/signup))

#### Steps

1. **Push Code to Git Repository** (same as Vercel)

2. **Import Project to Netlify**
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git provider
   - Select your repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Click "Show advanced" → "New variable"
   - Add `MONGODB_URI` environment variable

4. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete
   - Your app is live!

---

### Option 3: Railway

Railway offers easy deployment with built-in database options.

#### Steps

1. **Create Railway Account**
   - Go to [Railway](https://railway.app/)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add Environment Variables**
   - Click on your service
   - Go to "Variables" tab
   - Add `MONGODB_URI`

4. **Deploy**
   - Railway automatically builds and deploys
   - Get your public URL from the deployment

---

### Option 4: DigitalOcean App Platform

#### Steps

1. **Create DigitalOcean Account**
   - Go to [DigitalOcean](https://www.digitalocean.com/)
   - Sign up and verify account

2. **Create New App**
   - Go to Apps → Create App
   - Connect your GitHub repository
   - Select branch to deploy

3. **Configure App**
   - Detected as Node.js app
   - Build command: `npm run build`
   - Run command: `npm start`

4. **Add Environment Variables**
   - In app settings, add `MONGODB_URI`

5. **Deploy**
   - Click "Create Resources"
   - Wait for deployment

---

## Pre-Deployment Checklist

### Code Preparation

- [ ] Remove console.log statements
- [ ] Test all features locally
- [ ] Verify MongoDB connection
- [ ] Check all API endpoints
- [ ] Test on different browsers
- [ ] Verify mobile responsiveness

### Environment Variables

- [ ] `MONGODB_URI` is set correctly
- [ ] No hardcoded secrets in code
- [ ] `.env.local` is in `.gitignore`

### MongoDB Atlas Configuration

- [ ] Database user created
- [ ] Network access configured
- [ ] Connection string tested
- [ ] Collections indexed properly

### Performance

- [ ] Run `npm run build` locally
- [ ] Check bundle size
- [ ] Optimize images (if any)
- [ ] Test loading times

### Security

- [ ] Update MongoDB network access for production
- [ ] Use strong database passwords
- [ ] Enable CORS if needed
- [ ] Review API rate limiting needs

---

## Post-Deployment Tasks

### 1. Verify Deployment

Test all features in production:
- [ ] Create a player
- [ ] Create a game
- [ ] Join a game
- [ ] Play a complete game
- [ ] View leaderboard
- [ ] View history
- [ ] Test game replay

### 2. Monitor Application

#### Vercel Analytics
- Enable Vercel Analytics in project settings
- Monitor page views and performance

#### Error Tracking
Consider adding error tracking:
- [Sentry](https://sentry.io/)
- [LogRocket](https://logrocket.com/)
- [Rollbar](https://rollbar.com/)

#### MongoDB Monitoring
- Use MongoDB Atlas monitoring dashboard
- Set up alerts for high usage
- Monitor query performance

### 3. Set Up Custom Domain (Optional)

#### Purchase Domain
- [Namecheap](https://www.namecheap.com/)
- [Google Domains](https://domains.google/)
- [GoDaddy](https://www.godaddy.com/)

#### Configure DNS
Point your domain to your deployment platform:
- Vercel: Add A and CNAME records
- Netlify: Add CNAME record
- Follow platform-specific instructions

### 4. Enable HTTPS
- Most platforms provide automatic HTTPS
- Verify SSL certificate is active
- Test with [SSL Labs](https://www.ssllabs.com/ssltest/)

---

## Environment-Specific Configuration

### Development
```env
MONGODB_URI=mongodb+srv://dev-user:password@cluster0.xxxxx.mongodb.net/tictactoe-dev?retryWrites=true&w=majority
NODE_ENV=development
```

### Production
```env
MONGODB_URI=mongodb+srv://prod-user:password@cluster0.xxxxx.mongodb.net/tictactoe?retryWrites=true&w=majority
NODE_ENV=production
```

---

## Scaling Considerations

### Database
- **Free Tier**: 512 MB storage, shared cluster
- **Upgrade When**: 
  - Storage exceeds 400 MB
  - Need better performance
  - Require backups

### Application
- **Serverless (Vercel/Netlify)**: Auto-scales
- **Traditional Hosting**: May need manual scaling

### Optimization Tips
1. **Enable MongoDB Indexes**
   ```javascript
   // Already implemented in models
   GameSchema.index({ status: 1, createdAt: -1 });
   MoveSchema.index({ gameId: 1, timestamp: 1 });
   ```

2. **Implement Caching**
   - Cache leaderboard data
   - Use Redis for session storage
   - CDN for static assets

3. **Database Connection Pooling**
   - Already implemented in `lib/mongodb.js`
   - Reuses connections efficiently

---

## Troubleshooting Deployment Issues

### Build Failures

**Error**: "Module not found"
```bash
# Solution: Ensure all dependencies are in package.json
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

**Error**: "Build exceeded time limit"
```bash
# Solution: Optimize build process
# Remove unused dependencies
# Check for circular dependencies
```

### Runtime Errors

**Error**: "Cannot connect to MongoDB"
- Verify `MONGODB_URI` environment variable
- Check MongoDB Atlas network access
- Ensure database user has correct permissions

**Error**: "API route not found"
- Check file naming in `app/api/` directory
- Verify route exports are correct
- Check Next.js version compatibility

### Performance Issues

**Slow Page Loads**
- Enable Vercel Analytics to identify bottlenecks
- Check MongoDB query performance
- Optimize images and assets
- Review API response times

**High Database Usage**
- Review query patterns
- Add appropriate indexes
- Implement pagination
- Cache frequently accessed data

---

## Continuous Integration/Deployment (CI/CD)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## Backup Strategy

### MongoDB Backups

1. **Automated Backups** (M10+ clusters)
   - Enable in MongoDB Atlas
   - Configure retention period
   - Test restore process

2. **Manual Exports**
   ```bash
   # Export all collections
   mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/tictactoe"
   
   # Import backup
   mongorestore --uri="mongodb+srv://user:pass@cluster.mongodb.net/tictactoe" dump/
   ```

### Code Backups
- Git repository is your primary backup
- Consider multiple remotes (GitHub + GitLab)
- Tag releases for easy rollback

---

## Monitoring & Analytics

### Application Metrics
- Page views
- User engagement
- Game completion rate
- Average game duration
- Error rates

### Database Metrics
- Connection count
- Query performance
- Storage usage
- Index efficiency

### User Metrics
- New players per day
- Active players
- Games played
- Leaderboard changes

---

## Cost Estimation

### Free Tier (Suitable for Learning/Testing)
- **Vercel**: Free for personal projects
- **MongoDB Atlas**: 512 MB free tier
- **Custom Domain**: $10-15/year

### Production (Small Scale)
- **Vercel Pro**: $20/month
- **MongoDB M10**: $57/month
- **Custom Domain**: $10-15/year
- **Total**: ~$77-92/month

### Production (Medium Scale)
- **Vercel Team**: $20/user/month
- **MongoDB M20**: $140/month
- **CDN**: $10-50/month
- **Total**: ~$170-210/month

---

## Support & Resources

### Documentation
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)

### Community
- [Next.js Discord](https://nextjs.org/discord)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [MongoDB Community Forums](https://www.mongodb.com/community/forums/)

### Getting Help
1. Check error logs in deployment platform
2. Review MongoDB Atlas logs
3. Search GitHub issues
4. Ask in community forums
5. Contact platform support

---

## Security Best Practices

### Production Checklist
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS only
- [ ] Restrict MongoDB network access
- [ ] Implement rate limiting
- [ ] Add CORS headers if needed
- [ ] Regular security updates
- [ ] Monitor for suspicious activity
- [ ] Use strong database passwords
- [ ] Enable 2FA on all accounts
- [ ] Regular backup verification

---

## Maintenance

### Regular Tasks
- **Weekly**: Check error logs
- **Monthly**: Review performance metrics
- **Quarterly**: Update dependencies
- **Annually**: Review and optimize costs

### Updates
```bash
# Check for outdated packages
npm outdated

# Update dependencies
npm update

# Test thoroughly
npm run dev
npm run build

# Deploy
git add .
git commit -m "Update dependencies"
git push
```

---

## Rollback Procedure

### Vercel
1. Go to Deployments tab
2. Find previous working deployment
3. Click "..." → "Promote to Production"

### Git-based Rollback
```bash
# Find commit to rollback to
git log

# Revert to specific commit
git revert <commit-hash>
git push

# Or reset (use with caution)
git reset --hard <commit-hash>
git push --force
```

---

## Success Metrics

Track these metrics to measure success:
- **Uptime**: Target 99.9%
- **Response Time**: < 200ms average
- **Error Rate**: < 0.1%
- **User Growth**: Track new players
- **Engagement**: Games per user
- **Performance**: Lighthouse score > 90

---

## Conclusion

Your Tic Tac Toe multiplayer application is now ready for deployment! Choose the platform that best fits your needs and follow the steps above. Remember to test thoroughly before going live and monitor your application after deployment.

Good luck! 🚀
