import {existsSync, readFileSync} from 'node:fs';
import {spawn} from 'node:child_process';
const checks=[['foundation','scripts/verify.mjs']];
const management=['DEVELOPMENT.md','CONTRIBUTING.md','TESTING.md','SECURITY.md','ARCHITECTURE.md','RELEASE.md','ROADMAP.md','CHANGELOG.md','.github/workflows/ci.yml','.github/workflows/release.yml','.github/workflows/scheduled-ci.yml','.github/workflows/npm-lockfile-update.yml','.github/dependabot.yml','.github/PULL_REQUEST_TEMPLATE.md','.github/ISSUE_TEMPLATE/bug_report.md','.github/ISSUE_TEMPLATE/feature_request.md','.github/ISSUE_TEMPLATE/task.md','.github/ISSUE_TEMPLATE/config.yml'];
for (const file of management) { if (!existsSync(file) || !readFileSync(file,'utf8').trim()) throw new Error(`❌ 管理成果物が不足または空です：${file}`); }
for (const [name,file] of checks) await new Promise((resolve,reject)=>{const child=spawn(process.execPath,[file],{stdio:'inherit',shell:false});child.once('error',reject);child.once('exit',code=>code===0?resolve():reject(new Error(`❌ ${name} の検証に失敗しました：Exit Code ${code}`)));});
console.log(`✅ verify:all に合格しました (${management.length} 管理成果物)`);
