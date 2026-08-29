import { cookies } from "next/headers";
import {
  getLabInviteCode,
  getLabPublicRolloutPercent,
  getPublicLabWsUrl,
  getServerLabWsUrl,
  isInLabPublicRollout,
  isLabPublicEnabled,
  LAB_BUCKET_COOKIE,
  LAB_INVITE_COOKIE,
} from "@/lib/lab";
import LaunchEngineeringLab, {
  type LabStatus,
} from "@/components/LaunchEngineeringLab";

export default async function LaunchEngineeringLabGate() {
  const publicUrl = getPublicLabWsUrl();
  if (publicUrl) {
    const initialStatus: LabStatus = {
      mode: "owner",
      unlocked: true,
      hostAvailable: true,
      inviteConfigured: false,
      wsUrl: publicUrl,
      rollout: null,
    };
    return <LaunchEngineeringLab initialStatus={initialStatus} />;
  }

  const cookieStore = await cookies();
  const bucketId = cookieStore.get(LAB_BUCKET_COOKIE)?.value;
  const inviteConfigured = Boolean(getLabInviteCode());
  const inviteUnlocked = cookieStore.get(LAB_INVITE_COOKIE)?.value === "1";
  const serverUrl = getServerLabWsUrl();
  const rolloutPercent = getLabPublicRolloutPercent();
  const publicEnabled = isLabPublicEnabled();
  const inRollout = isInLabPublicRollout(bucketId);
  const rolloutMeta = {
    evaluated: publicEnabled,
    inRollout,
    percent: rolloutPercent,
  };

  // Valid invite cookie
  if (inviteConfigured && inviteUnlocked) {
    const initialStatus: LabStatus = {
      mode: "invite",
      unlocked: true,
      hostAvailable: Boolean(serverUrl),
      inviteConfigured: true,
      wsUrl: serverUrl,
      rollout: rolloutMeta,
    };
    return <LaunchEngineeringLab initialStatus={initialStatus} />;
  }

  // Anonymous public rollout (default percent 0 / enabled off → never)
  if (inRollout) {
    const initialStatus: LabStatus = {
      mode: "rollout",
      unlocked: true,
      hostAvailable: Boolean(serverUrl),
      inviteConfigured,
      wsUrl: serverUrl,
      rollout: rolloutMeta,
    };
    return <LaunchEngineeringLab initialStatus={initialStatus} />;
  }

  // Invite configured but not unlocked — show invite form
  if (inviteConfigured) {
    const initialStatus: LabStatus = {
      mode: "invite",
      unlocked: false,
      hostAvailable: Boolean(serverUrl),
      inviteConfigured: true,
      wsUrl: null,
      rollout: rolloutMeta,
    };
    return <LaunchEngineeringLab initialStatus={initialStatus} />;
  }

  // Still evaluate exposure analytics when public flag is on but visitor is out of bucket
  if (publicEnabled) {
    const initialStatus: LabStatus = {
      mode: "hidden",
      unlocked: false,
      hostAvailable: Boolean(serverUrl),
      inviteConfigured: false,
      wsUrl: null,
      rollout: rolloutMeta,
    };
    return <LaunchEngineeringLab initialStatus={initialStatus} />;
  }

  return null;
}
