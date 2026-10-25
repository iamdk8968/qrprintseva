# build_exe.py — 1-Click PyInstaller Build Script
# Run this on Windows: python build_exe.py
import os
import sys
import subprocess

def build():
    print("=" * 60)
    print("  BUILDING QR PRINT SEVA WINDOWS DESKTOP AGENT (.EXE)")
    print("=" * 60)

    # 1. Check PyInstaller
    try:
        import PyInstaller
    except ImportError:
        print("[INSTALL] Installing PyInstaller...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "pyinstaller"])

    # 2. Run PyInstaller command
    cmd = [
        "pyinstaller",
        "--noconsole",            # Runs without background black terminal window
        "--onefile",              # Bundles into a single standalone .exe
        "--name=QR-Print-Seva-Agent",
        "--clean",
        "qrprintseva_agent.py"
    ]

    print(f"[BUILD] Executing: {' '.join(cmd)}")
    subprocess.check_call(cmd)

    print("\n" + "=" * 60)
    print("  SUCCESS! Standalone Executable Created at:")
    print("  dist/QR-Print-Seva-Agent.exe")
    print("=" * 60)

if __name__ == "__main__":
    build()
