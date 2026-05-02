# Remove Folder

```bash
git rm -r one-of-the-directories // This deletes from filesystem
git commit . -m "Remove duplicated directory"
git push origin <your-git-branch> (typically 'master', but not always)
Remove directory from Git but NOT local
To remove this directory from Git, but not delete it entirely from the filesystem (local):

git rm -r --cached myFolder
```
