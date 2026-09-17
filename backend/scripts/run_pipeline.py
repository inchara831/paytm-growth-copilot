import subprocess,sys,urllib.request,zipfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]; raw=ROOT/'data/raw'; url='https://www.kaggle.com/api/v1/datasets/download/shashanks1202/retail-transactions-online-sales-dataset'
def main():
 raw.mkdir(parents=True,exist_ok=True); archive=raw/'source.zip'
 if not list(raw.glob('*.xlsx')) and not list(raw.glob('*.csv')):
  print('Downloading documented public Kaggle proxy dataset...'); urllib.request.urlretrieve(url,archive)
  with zipfile.ZipFile(archive) as z:z.extractall(raw)
 for x in ['process_dataset.py','validate_dataset.py','seed_database.py']: subprocess.run([sys.executable,str(ROOT/'scripts'/x)],check=True)
if __name__=='__main__':main()
