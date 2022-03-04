from TikTokApi import TikTokApi
import sys, os




video_url = sys.argv[1]
video_save_path = video_url.split("/")[-1]

# Starts TikTokApi
api = TikTokApi.get_instance()



custom_fp = "verify_kxbn1nsr_yM40IQVm_AY4K_44vb_9Ynk_pievCYDrJYBn"

link = api.get_video_by_url(video_url, custom_verifyFp=custom_fp)
folder = os.path.abspath(os.getcwd())
with open(folder+"/tiktokapi/videos/video_{}.mp4".format(video_save_path), "wb") as out:
    out.write(link)
