#!/usr/bin/env python3
"""
PyInstaller build script to compile qrprintseva_agent.py into a single Windows .exe
"""
import sys
import subprocess

def main():
    print("[BUILD] Packaging QR Print Seva Desktop Agent...")
    cmd = [
        sys.executable,
        "-m",
        "PyInstaller",
        "--noconfirm",
        "--onefile",
        "--windowed",
        "--name",
        "QR-Print-Seva-Agent",
        "qrprintseva_agent.py"
    ]
    try:
        subprocess.check_call(cmd)
        print("\n========================================================")
        print(" [SUCCESS] Executable built inside: dist/QR-Print-Seva-Agent.exe")
        print("========================================================")
    except Exception as e:
        print(f"[ERROR] Build failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
