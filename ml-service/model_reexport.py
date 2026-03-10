import pickle
import sys
import shutil
from pathlib import Path, PureWindowsPath, PurePosixPath

# Monkey patch to convert WindowsPath to PosixPath during unpickling
original_reduce_ex = PureWindowsPath.__reduce_ex__

def patched_reduce_ex(self, protocol):
    return (PurePosixPath, (str(self),))

PureWindowsPath.__reduce_ex__ = patched_reduce_ex

# Now load and re-export
from fastai.vision.all import load_learner

MODEL_PATH = Path(__file__).resolve().parent / "models" / "breed_model.pkl"
OUTPUT_PATH = Path(__file__).resolve().parent / "models" / "breed_model_fixed.pkl"

try:
    learn = load_learner(MODEL_PATH)
    learn.export(OUTPUT_PATH)
    print(f"Model re-exported successfully to {OUTPUT_PATH}")
    
    # Replace original with fixed version
    shutil.move(str(OUTPUT_PATH), str(MODEL_PATH))
    print(f"Renamed to {MODEL_PATH}")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)