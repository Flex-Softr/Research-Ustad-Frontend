export interface Achievement {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAchievementData {
  title: string;
  description: string;
  imageUrl?: string;
}

export interface UpdateAchievementData {
  title?: string;
  description?: string;
  imageUrl?: string;
}
